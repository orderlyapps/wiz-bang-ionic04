import { useState, useEffect } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { Body } from "@ui/components/display/text/body/Body";
import type { MapRow } from "@shared/database/schemas/map";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { ParsedRow } from "../csv-upload/CsvUpload";
import { UnmatchedMaps } from "./components/unmatched-maps/UnmatchedMaps";
import { UnmatchedPublishers } from "./components/unmatched-publishers/UnmatchedPublishers";
import { DuplicateReview } from "./components/duplicate-review/DuplicateReview";

interface ValidationSummaryProps {
  rows: ParsedRow[];
  on_done: (rows: ParsedRow[]) => void;
}

export function ValidationSummary({ rows, on_done }: ValidationSummaryProps) {
  const [map_resolutions, set_map_resolutions] = useState<Record<string, string>>({});
  const [publisher_resolutions, set_publisher_resolutions] = useState<Record<string, string>>({});
  const [step, set_step] = useState<"maps" | "publishers" | "duplicates">("maps");
  const [removed_indices, set_removed_indices] = useState<Set<number>>(new Set());

  const { data: maps_data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }));
  const congregation = useStoredCongregation();

  const maps = ((maps_data as MapRow[] | undefined) ?? []).filter(
    (m) => m.congregation_id === congregation?.id,
  );
  const publishers = ((publishers_data as Publisher[] | undefined) ?? []).filter(
    (p) => p.congregation_id === congregation?.id && !p.archived_at,
  );

  const map_name_to_id = new Map(maps.map((m) => [m.name.toLowerCase().trim(), m.id!]));
  const publisher_name_to_id = new Map(
    publishers.map((p) => [getPublisherDisplayName(p).toLowerCase().trim(), p.id!]),
  );

  const resolved_rows = rows.map((row, i) => ({
    ...row,
    map_id: map_name_to_id.get(row.map_name.toLowerCase().trim()) ?? map_resolutions[row.map_name],
    publisher_id:
      publisher_name_to_id.get(row.publisher_name.toLowerCase().trim()) ??
      publisher_resolutions[row.publisher_name],
    _remove: removed_indices.has(i),
  }));

  const unmatched_maps = Array.from(
    new Set(resolved_rows.filter((r) => !r.map_id).map((r) => r.map_name)),
  );
  const unmatched_publishers = Array.from(
    new Set(resolved_rows.filter((r) => !r.publisher_id).map((r) => r.publisher_name)),
  );

  const all_maps_resolved = unmatched_maps.length === 0;
  const all_publishers_resolved = unmatched_publishers.length === 0;

  function handleMapResolve(name: string, map_id: string) {
    set_map_resolutions((prev) => ({ ...prev, [name]: map_id }));
  }

  function handlePublisherResolve(name: string, publisher_id: string) {
    set_publisher_resolutions((prev) => ({ ...prev, [name]: publisher_id }));
  }

  function handleToggleRemove(index: number) {
    set_removed_indices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  useEffect(() => {
    if (step !== "duplicates") return;
    const groups: Record<string, number[]> = {};
    resolved_rows.forEach((row, i) => {
      const key = `${row.map_id}|${row.publisher_id}|${row.checked_out_at}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(i);
    });
    const to_remove = new Set<number>();
    for (const indices of Object.values(groups)) {
      if (indices.length > 1) {
        indices.slice(1).forEach((i) => to_remove.add(i));
      }
    }
    set_removed_indices(to_remove);
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  if (step === "maps") {
    return (
      <>
        <UnmatchedMaps
          unmatched_names={unmatched_maps}
          maps={maps}
          resolutions={map_resolutions}
          on_resolve={handleMapResolve}
        />
        {all_maps_resolved && (
          <>
            <Space />
            <Body>All map names resolved.</Body>
            <TextButton label="Continue" on_click={() => set_step("publishers")} />
          </>
        )}
        {!all_maps_resolved && (
          <>
            <Space />
            <Body color="medium">Resolve all unmatched maps to continue.</Body>
          </>
        )}
      </>
    );
  }

  if (step === "publishers") {
    return (
      <>
        <UnmatchedPublishers
          unmatched_names={unmatched_publishers}
          publishers={publishers}
          resolutions={publisher_resolutions}
          on_resolve={handlePublisherResolve}
        />
        {all_publishers_resolved && (
          <>
            <Space />
            <Body>All publisher names resolved.</Body>
            <TextButton label="Continue" on_click={() => set_step("duplicates")} />
          </>
        )}
        {!all_publishers_resolved && (
          <>
            <Space />
            <Body color="medium">Resolve all unmatched publishers to continue.</Body>
          </>
        )}
        <TextButton label="Back" fill="clear" on_click={() => set_step("maps")} />
      </>
    );
  }

  return (
    <>
      {(() => {
        const groups: Record<string, number[]> = {};
        resolved_rows.forEach((row, i) => {
          if (row._remove) return;
          const key = `${row.map_id}|${row.publisher_id}|${row.checked_out_at}`;
          if (!groups[key]) groups[key] = [];
          groups[key].push(i);
        });
        const has_dupes = Object.values(groups).some((g) => g.length > 1);
        if (!has_dupes) {
          return (
            <>
              <Body>No duplicates found.</Body>
              <Space />
              <TextButton label="Continue to Preview" on_click={() => on_done(resolved_rows)} />
            </>
          );
        }
        return (
          <>
            <DuplicateReview rows={resolved_rows} on_toggle_remove={handleToggleRemove} />
            <Space />
            <TextButton
              label="Continue to Preview"
              on_click={() => on_done(resolved_rows.filter((r) => !r._remove))}
            />
          </>
        );
      })()}
      <TextButton label="Back" fill="clear" on_click={() => set_step("publishers")} />
    </>
  );
}
