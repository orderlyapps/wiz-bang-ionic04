import { useState } from "react";
import { streetCollection } from "@shared/database/collections/street";
import { searchStreets } from "@util/vendor/mapbox/helper/searchStreets";
import { getStoredCongregation } from "@util/app/congregation/utils";
import type { MapboxGeocodingFeature } from "@util/vendor/mapbox/types/MapboxGeocodingResponse";
import type { Street } from "@shared/database/schemas/street";
import type { SuburbRef } from "../../../../../../../../types";

export function useAddStreetSearch(suburb: SuburbRef | undefined) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MapboxGeocodingFeature[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState<MapboxGeocodingFeature | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(q: string) {
    setQuery(q);
    if (!q.trim() || !suburb?.bbox || suburb.bbox.length < 4) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    try {
      setResults(await searchStreets(q, suburb.bbox as [number, number, number, number]));
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  async function handleConfirm(): Promise<Street | null> {
    if (!selected || !suburb?.id) return null;
    const cId = getStoredCongregation()?.id;
    if (!cId) {
      setError("No congregation selected");
      setSelected(null);
      return null;
    }
    try {
      const newStreet: Street = {
        id: crypto.randomUUID(),
        congregation_id: cId,
        suburb_id: suburb.id,
        name: selected.properties.name,
        coordinates: Array.from(selected.geometry.coordinates),
      };
      const tx = streetCollection.insert(newStreet);
      await tx.isPersisted.promise;
      setSelected(null);
      return newStreet;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(
        msg.includes("street_congregation_id_name_suburb_id_key")
          ? "This street has already been added"
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

  const matched = suburb
    ? results.filter((s) => s.properties.context?.place?.name === suburb.name)
    : [];
  const unmatched = suburb
    ? results.filter((s) => s.properties.context?.place?.name !== suburb.name)
    : [];

  return {
    query,
    matched,
    unmatched,
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
