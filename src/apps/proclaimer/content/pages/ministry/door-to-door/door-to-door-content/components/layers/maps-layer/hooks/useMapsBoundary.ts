import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MapRow } from "@shared/database/schemas/map";
import { isValidBoundary } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/boundary";
import { useMapDisplayMode } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useMapDisplayModeContext";
import { useSelectedMap } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useSelectedMapContext";

type PolygonFeature = {
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: number[][][] };
  properties: { id: string | null; name: string; details: string | null; is_selected: boolean };
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
  const { displayMode } = useMapDisplayMode();
  const { selectedMapId } = useSelectedMap();

  const features = ((data ?? []) as MapRow[])
    .filter(
      (row): row is MapRow & { boundary: number[][] } =>
        row.congregation_id === congregation_id && isValidBoundary(row.boundary),
    )
    .filter((row) => {
      // If display mode is "selected", only show the selected map
      if (displayMode === "selected") {
        return selectedMapId ? row.id === selectedMapId : false;
      }
      // Otherwise show all maps
      return true;
    })
    .map((row) => ({
      type: "Feature" as const,
      geometry: toGeoJSONPolygon(row.boundary),
      properties: {
        id: row.id ?? null,
        name: row.name,
        details: row.details ?? null,
        is_selected: row.id === selectedMapId,
      },
    }));

  return { type: "FeatureCollection", features };
}
