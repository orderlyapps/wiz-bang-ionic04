import { Source, Layer } from "react-map-gl/mapbox";
import type { SelectedMap } from "../../../utils/types";
import {
  isValidBoundary,
  blockToLineStringCoords,
  blockToPolygonCoords,
} from "../../../utils/boundary";
import type { ScreenshotSettings } from "../../../utils/screenshotSettings";

type Props = {
  selectedMap: SelectedMap;
  settings: ScreenshotSettings;
};

const labelPaint = {
  "text-color": "#1f2937" as const,
  "text-halo-color": "#ffffff" as const,
  "text-halo-width": 2,
};

export function ScreenshotMapLayer({ selectedMap, settings }: Props) {
  if (selectedMap.type !== "map") return null;

  const boundaryFeatures = isValidBoundary(selectedMap.boundary)
    ? [
        {
          type: "Feature" as const,
          geometry: {
            type: "Polygon" as const,
            coordinates: [selectedMap.boundary as number[][]],
          },
          properties: {},
        },
      ]
    : [];

  const polygonBlockFeatures: GeoJSON.Feature[] = [];
  const lineBlockFeatures: GeoJSON.Feature[] = [];
  const lineEndpointFeatures: GeoJSON.Feature[] = [];

  for (const block of selectedMap.blocks ?? []) {
    if (block.type === "face") {
      const coords = blockToLineStringCoords(block.coordinates);
      if (!coords) continue;
      lineBlockFeatures.push({
        type: "Feature",
        geometry: { type: "LineString", coordinates: coords },
        properties: { name: block.name },
      });
      const first = coords[0];
      const last = coords[coords.length - 1];
      if (first)
        lineEndpointFeatures.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: first },
          properties: { name: block.name },
        });
      if (last && (!first || last[0] !== first[0] || last[1] !== first[1]))
        lineEndpointFeatures.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: last },
          properties: { name: block.name },
        });
    } else {
      const coords = blockToPolygonCoords(block.coordinates);
      if (!coords) continue;
      polygonBlockFeatures.push({
        type: "Feature",
        geometry: { type: "Polygon", coordinates: coords },
        properties: { name: block.name },
      });
    }
  }

  return (
    <>
      <Source
        id="screenshot-boundary"
        type="geojson"
        data={{ type: "FeatureCollection", features: boundaryFeatures }}
      >
        <Layer
          id="screenshot-boundary-fill"
          type="fill"
          paint={{ "fill-color": "#10b981", "fill-opacity": 0 }}
        />
        <Layer
          id="screenshot-boundary-line"
          type="line"
          paint={{ "line-color": "#F00", "line-width": settings.boundary_line_width }}
          beforeId="road-label"
        />
      </Source>
      <Source
        id="screenshot-polygon-blocks"
        type="geojson"
        data={{ type: "FeatureCollection", features: polygonBlockFeatures }}
      >
        <Layer
          id="screenshot-polygon-blocks-line"
          type="line"
          paint={{
            "line-color": "#4f46e5",
            "line-width": settings.block_line_width,
            "line-opacity": settings.block_opacity,
            "line-dasharray": [4, 2],
          }}
        />
        <Layer
          id="screenshot-polygon-blocks-label"
          type="symbol"
          layout={{
            "text-field": ["get", "name"],
            "text-size": settings.block_text_size,
            "text-anchor": "center",
            "text-allow-overlap": true,
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          }}
          paint={labelPaint}
        />
      </Source>
      <Source
        id="screenshot-line-blocks"
        type="geojson"
        data={{ type: "FeatureCollection", features: lineBlockFeatures }}
      >
        <Layer
          id="screenshot-line-blocks-line"
          type="line"
          paint={{
            "line-color": "#4f46e5",
            "line-width": settings.block_line_width,
            "line-opacity": settings.block_opacity,
            "line-dasharray": [4, 2],
          }}
        />
      </Source>
      <Source
        id="screenshot-line-endpoints"
        type="geojson"
        data={{ type: "FeatureCollection", features: lineEndpointFeatures }}
      >
        <Layer
          id="screenshot-line-endpoints-label"
          type="symbol"
          layout={{
            "text-field": ["get", "name"],
            "text-size": settings.block_text_size,
            "text-anchor": "center",
            "text-allow-overlap": true,
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          }}
          paint={labelPaint}
        />
      </Source>
    </>
  );
}
