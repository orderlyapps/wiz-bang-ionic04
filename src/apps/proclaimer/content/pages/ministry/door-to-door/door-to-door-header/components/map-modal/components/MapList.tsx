import { IonList } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { useMapsList } from "../hooks/useMapsList";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { mapTagAssignmentCollection } from "@shared/database/collections/map-tag-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { MapListItem } from "./map-list-item/MapListItem";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { MapTagAssignmentRow } from "@shared/database/schemas/map-tag-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { MinistryMapFilters, MinistryMapSortOrder } from "../hooks/types";

type MapWithBoundary = MapRow & { boundary: number[][] };

interface MapListProps {
  onMapSelect: (map: MapWithBoundary) => void;
  onPreviewImage: (url: string) => void;
  search_query: string;
  filter: MinistryMapFilters;
  sort_order: MinistryMapSortOrder;
}

export function MapList({
  onMapSelect,
  onPreviewImage,
  search_query,
  filter,
  sort_order,
}: MapListProps) {
  const maps = useMapsList();
  const { data: logs_data } = useLiveQuery((q) => q.from({ l: mapLogCollection }));
  const { data: assignments_data } = useLiveQuery((q) => q.from({ a: mapTagAssignmentCollection }));
  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const all_logs = (logs_data as MapLogRow[] | undefined) ?? [];
  const all_assignments = (assignments_data as MapTagAssignmentRow[] | undefined) ?? [];
  const all_publishers = (publishers_data as Publisher[] | undefined) ?? [];

  const publisher_name_by_id = new Map(
    all_publishers.map((p) => [p.id ?? "", getPublisherDisplayName(p)]),
  );

  const checked_out_map_ids = new Set(
    all_logs.filter((log) => log.checked_out_at && !log.checked_in_at).map((log) => log.map_id),
  );

  const checked_out_name_by_map_id = new Map(
    all_logs
      .filter((log) => log.checked_out_at && !log.checked_in_at)
      .map((log) => [log.map_id, publisher_name_by_id.get(log.publisher_id) ?? ""]),
  );

  const last_activity_by_map_id = new Map<string, string>();
  for (const log of all_logs) {
    const activity = log.checked_in_at ?? log.checked_out_at ?? "";
    const current = last_activity_by_map_id.get(log.map_id) ?? "";
    if (activity > current) {
      last_activity_by_map_id.set(log.map_id, activity);
    }
  }

  const tag_map_ids = new Set(
    all_assignments.filter((a) => filter.tag_ids.includes(a.tag_id)).map((a) => a.map_id),
  );

  const all_tagged_map_ids = new Set(all_assignments.map((a) => a.map_id));

  const filtered = maps.filter((map) => {
    if (filter.checked_out_only && !checked_out_map_ids.has(map.id!)) {
      return false;
    }
    if (filter.untagged_only && all_tagged_map_ids.has(map.id!)) {
      return false;
    }
    if (!filter.untagged_only && filter.tag_ids.length > 0 && !tag_map_ids.has(map.id!)) {
      return false;
    }
    if (search_query) {
      const q = search_query.toLowerCase();
      const checked_out_name = checked_out_name_by_map_id.get(map.id ?? "") ?? "";
      if (
        !map.name.toLowerCase().includes(q) &&
        !(map.details ?? "").toLowerCase().includes(q) &&
        !checked_out_name.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  if (sort_order === "recent_activity") {
    filtered.sort((a, b) => {
      const a_date = last_activity_by_map_id.get(a.id ?? "") ?? "";
      const b_date = last_activity_by_map_id.get(b.id ?? "") ?? "";
      return b_date.localeCompare(a_date) || a.name.localeCompare(b.name);
    });
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filtered.length === 0) {
    return (
      <div style={{ padding: "16px", textAlign: "center", color: "var(--ion-color-medium)" }}>
        No maps found
      </div>
    );
  }

  return (
    <IonList>
      {filtered.map((map) => {
        const is_checked_out = checked_out_map_ids.has(map.id ?? "");
        const checked_out_name = checked_out_name_by_map_id.get(map.id ?? "") ?? "";
        return (
          <MapListItem
            key={map.id}
            map={map}
            onMapSelect={onMapSelect}
            onPreviewImage={onPreviewImage}
            label_color={is_checked_out ? "success" : undefined}
            value_2={checked_out_name || undefined}
          />
        );
      })}
    </IonList>
  );
}
