import { useState } from "react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { suburbCollection } from "@shared/database/collections/suburb";
import { mapMasterCollection } from "@shared/database/collections/map-master";
import { searchSuburbs } from "@util/vendor/mapbox/helper/searchSuburbs";
import { getStoredCongregation } from "@util/app/congregation/utils";
import type { MapboxGeocodingFeature } from "@util/vendor/mapbox/types/MapboxGeocodingResponse";
import type { Suburb } from "@shared/database/schemas/suburb";

function getBbox(boundary: unknown): [number, number, number, number] | undefined {
  if (!Array.isArray(boundary) || boundary.length === 0) return undefined;
  const coords = boundary as [number, number][];
  const lngs = coords.map((c) => c[0]);
  const lats = coords.map((c) => c[1]);
  return [Math.min(...lngs), Math.min(...lats), Math.max(...lngs), Math.max(...lats)];
}

export function useAddSuburbSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MapboxGeocodingFeature[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState<MapboxGeocodingFeature | null>(null);
  const [error, setError] = useState<string | null>(null);

  const congregationId = getStoredCongregation()?.id;
  const { data: mapMaster } = useLiveQuery(
    (q) => {
      if (!congregationId) return undefined;
      return q
        .from({ mm: mapMasterCollection })
        .where(({ mm }) => eq(mm.congregation_id, congregationId));
    },
    [congregationId],
  );
  const bbox = getBbox(mapMaster?.[0]?.boundary);

  async function handleSearch(q: string) {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    try {
      setResults(await searchSuburbs(q, bbox));
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  async function handleConfirm(): Promise<Suburb | null> {
    if (!selected) return null;
    const cId = getStoredCongregation()?.id;
    if (!cId) {
      setError("No congregation selected");
      setSelected(null);
      return null;
    }
    if (!selected.properties.bbox) {
      setError("Suburb missing bounding box");
      setSelected(null);
      return null;
    }
    try {
      const newSuburb: Suburb = {
        id: crypto.randomUUID(),
        congregation_id: cId,
        name: selected.properties.name,
        bbox: Array.from(selected.properties.bbox),
      };
      const tx = suburbCollection.insert(newSuburb);
      await tx.isPersisted.promise;
      setSelected(null);
      return newSuburb;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(
        msg.includes("suburb_congregation_id_name_key")
          ? "This suburb has already been added"
          : msg,
      );
      setSelected(null);
      return null;
    }
  }

  function reset() {
    setQuery("");
    setResults([]);
    setIsSearching(false);
    setSelected(null);
    setError(null);
  }

  return {
    query,
    results,
    isSearching,
    selected,
    error,
    setSelected,
    setError,
    handleSearch,
    handleConfirm,
    reset,
  };
}
