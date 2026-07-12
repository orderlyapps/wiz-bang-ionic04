import { Source, Layer } from "react-map-gl/mapbox";
import { blockToLineStringCoords, blockToPolygonCoords } from "../../../utils/boundary";
import type { SelectedMap } from "../../../utils/types";

type BlockFeature =
  | {
      type: "Feature";
      geometry: { type: "Polygon"; coordinates: number[][][] };
      properties: { id: string; name: string; block_type: "block" };
    }
  | {
      type: "Feature";
      geometry: { type: "LineString"; coordinates: number[][] };
      properties: { id: string; name: string; block_type: "face" };
    };

export function MapBlocksLayer({ selectedMap }: { selectedMap: SelectedMap }) {
  if (selectedMap.type !== "map" || !selectedMap.blocks) return null;

  const features: BlockFeature[] = selectedMap.blocks
    .map((block) => {
      if (block.type === "face") {
        const coordinates = blockToLineStringCoords(block.coordinates);
        if (!coordinates) return null;
        return {
          type: "Feature" as const,
          geometry: { type: "LineString" as const, coordinates },
          properties: {
            id: block.id,
            name: block.name,
            block_type: block.type,
          },
        };
      }
      const coordinates = blockToPolygonCoords(block.coordinates);
      if (!coordinates) return null;
      return {
        type: "Feature" as const,
        geometry: { type: "Polygon" as const, coordinates },
        properties: {
          id: block.id,
          name: block.name,
          block_type: block.type,
        },
      };
    })
    .filter((feature): feature is BlockFeature => feature !== null);

  if (features.length === 0) return null;

  return (
    <Source id="map-blocks" type="geojson" data={{ type: "FeatureCollection", features }}>
      <Layer
        id="map-blocks-line"
        type="line"
        paint={{
          "line-color": "#4f46e5",
          "line-width": 2,
        }}
      />
      <Layer
        id="map-blocks-label"
        type="symbol"
        layout={{
          "text-field": ["get", "name"],
          "text-size": 14,
          "text-anchor": "center",
          "text-allow-overlap": true,
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
        }}
        paint={{
          "text-color": "#1f2937",
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        }}
      />
    </Source>
  );
}
