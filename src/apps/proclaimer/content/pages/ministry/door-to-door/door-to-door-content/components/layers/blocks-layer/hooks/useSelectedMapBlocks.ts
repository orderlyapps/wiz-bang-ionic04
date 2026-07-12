import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MapRow } from "@shared/database/schemas/map";
import {
  blockToLineStringCoords,
  blockToPolygonCoords,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/boundary";
import { useSelectedMap } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useSelectedMapContext";

type PolygonBlockFeature = {
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: number[][][] };
  properties: { id: string; name: string; block_type: "block" };
};

type LineBlockFeature = {
  type: "Feature";
  geometry: { type: "LineString"; coordinates: number[][] };
  properties: { id: string; name: string; block_type: "face" };
};

type LineEndpointFeature = {
  type: "Feature";
  geometry: { type: "Point"; coordinates: number[] };
  properties: { name: string };
};

export type BlocksGeoJSON = {
  type: "FeatureCollection";
  features: (PolygonBlockFeature | LineBlockFeature)[];
};

export type LineEndpointsGeoJSON = {
  type: "FeatureCollection";
  features: LineEndpointFeature[];
};

export function useSelectedMapBlocks(): {
  polygons: BlocksGeoJSON;
  lines: BlocksGeoJSON;
  lineEndpoints: LineEndpointsGeoJSON;
} {
  const { data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;
  const { selectedMapId } = useSelectedMap();

  const selectedMap = ((data ?? []) as MapRow[]).find(
    (row) => row.id === selectedMapId && row.congregation_id === congregation_id,
  );

  const empty: BlocksGeoJSON = { type: "FeatureCollection", features: [] };
  const emptyEndpoints: LineEndpointsGeoJSON = { type: "FeatureCollection", features: [] };

  if (!selectedMap || !selectedMap.blocks) {
    return { polygons: empty, lines: empty, lineEndpoints: emptyEndpoints };
  }

  const polygonFeatures: PolygonBlockFeature[] = [];
  const lineFeatures: LineBlockFeature[] = [];
  const lineEndpointFeatures: LineEndpointFeature[] = [];

  for (const block of selectedMap.blocks) {
    if (block.type === "face") {
      const coordinates = blockToLineStringCoords(block.coordinates);
      if (!coordinates) continue;

      lineFeatures.push({
        type: "Feature" as const,
        geometry: { type: "LineString" as const, coordinates },
        properties: {
          id: block.id,
          name: block.name,
          block_type: block.type,
        },
      });

      const first = coordinates[0];
      const last = coordinates[coordinates.length - 1];
      if (first) {
        lineEndpointFeatures.push({
          type: "Feature" as const,
          geometry: { type: "Point" as const, coordinates: first },
          properties: { name: block.name },
        });
      }
      if (last && first && (last[0] !== first[0] || last[1] !== first[1])) {
        lineEndpointFeatures.push({
          type: "Feature" as const,
          geometry: { type: "Point" as const, coordinates: last },
          properties: { name: block.name },
        });
      }
      continue;
    }

    const coordinates = blockToPolygonCoords(block.coordinates);
    if (!coordinates) continue;
    polygonFeatures.push({
      type: "Feature" as const,
      geometry: { type: "Polygon" as const, coordinates },
      properties: {
        id: block.id,
        name: block.name,
        block_type: block.type,
      },
    });
  }

  return {
    polygons: { type: "FeatureCollection", features: polygonFeatures },
    lines: { type: "FeatureCollection", features: lineFeatures },
    lineEndpoints: { type: "FeatureCollection", features: lineEndpointFeatures },
  };
}
