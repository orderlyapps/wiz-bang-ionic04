import { Source, Layer } from "react-map-gl/mapbox";
import { useSelectedMapBlocks } from "./hooks/useSelectedMapBlocks";
import { useTheme } from "@util/app/theme/hooks/use-theme";
import { JW_BLUE } from "@ui/colors/jwColors";

export function BlocksLayer() {
  const { polygons, lines, lineEndpoints } = useSelectedMapBlocks();
  const { resolved_theme } = useTheme();
  const hasPolygons = polygons.features.length > 0;
  const hasLines = lines.features.length > 0;
  const hasEndpoints = lineEndpoints.features.length > 0;

  if (!hasPolygons && !hasLines && !hasEndpoints) return null;

  const blue = JW_BLUE[resolved_theme].base;

  return (
    <>
      {hasPolygons && (
        <Source id="selected-map-blocks-polygons" type="geojson" data={polygons}>
          <Layer
            id="selected-map-blocks-polygons-line"
            type="line"
            paint={{
              "line-color": blue,
              "line-width": 2,
              "line-opacity": 0.4,
              "line-dasharray": [2, 1],
            }}
          />
          <Layer
            id="selected-map-blocks-polygons-label"
            type="symbol"
            minzoom={15}
            layout={{
              "text-field": ["get", "name"],
              "text-size": 24,
              "text-anchor": "center",
              "text-allow-overlap": true,
              "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
            }}
            paint={{
              "text-color": blue,
            }}
          />
        </Source>
      )}
      {hasLines && (
        <Source id="selected-map-blocks-lines" type="geojson" data={lines}>
          <Layer
            id="selected-map-blocks-lines-line"
            type="line"
            minzoom={15}
            paint={{
              "line-color": blue,
              "line-width": 2,
              "line-opacity": 0.4,
              "line-dasharray": [2, 1],
            }}
          />
        </Source>
      )}
      {hasEndpoints && (
        <Source id="selected-map-blocks-line-endpoints" type="geojson" data={lineEndpoints}>
          <Layer
            id="selected-map-blocks-line-endpoints-label"
            type="symbol"
            minzoom={15}
            layout={{
              "text-field": ["get", "name"],
              "text-size": 24,
              "text-anchor": "center",
              "text-allow-overlap": true,
              "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
            }}
            paint={{
              "text-color": blue,
            }}
          />
        </Source>
      )}
    </>
  );
}
