import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import { useMapLogPresets } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/use-map-log-presets/useMapLogPresets";
import { useFilteredMapLogMaps } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/use-filtered-map-log-maps/useFilteredMapLogMaps";
import type { MapRow } from "@shared/database/schemas/map";
import { isValidBoundary } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/boundary";

type PolygonFeature = {
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: number[][][] };
  properties: { id: string | null; name: string; details: string | null };
};

export type MapsGeoJSON = {
  type: "FeatureCollection";
  features: PolygonFeature[];
};

function toGeoJSONPolygon(boundary: number[][]): { type: "Polygon"; coordinates: number[][][] } {
  return { type: "Polygon", coordinates: [boundary] };
}

export function useMapsBoundary(): MapsGeoJSON {
  const { data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;
  const presets_api = useMapLogPresets(
    localStorageKeys.soMapListFilterSortPresets,
    localStorageKeys.soMapListFilterSortActivePreset,
  );

  const congregation_maps = ((data ?? []) as MapRow[]).filter(
    (row): row is MapRow & { boundary: number[][] } =>
      row.congregation_id === congregation_id && isValidBoundary(row.boundary),
  );

  const { maps: filtered_maps } = useFilteredMapLogMaps(
    congregation_maps,
    presets_api.active_preset.filter,
    presets_api.active_preset.sort_order,
  );

  const features = filtered_maps.map((row) => ({
    type: "Feature" as const,
    geometry: toGeoJSONPolygon(row.boundary),
    properties: {
      id: row.id ?? null,
      name: row.name,
      details: row.details ?? null,
    },
  }));

  return { type: "FeatureCollection", features };
}
