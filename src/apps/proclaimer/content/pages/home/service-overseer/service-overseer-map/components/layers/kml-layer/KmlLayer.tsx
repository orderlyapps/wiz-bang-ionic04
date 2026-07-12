import { Source, Layer } from "react-map-gl/mapbox";

type Props = {
  geojson: GeoJSON.FeatureCollection;
};

const ORANGE = "#f97316";

export function KmlLayer({ geojson }: Props) {
  if (geojson.features.length === 0) return null;

  return (
    <Source id="kml-import" type="geojson" data={geojson}>
      <Layer
        id="kml-import-fill"
        type="fill"
        filter={["==", ["geometry-type"], "Polygon"]}
        paint={{
          "fill-color": ORANGE,
          "fill-opacity": 0.1,
        }}
      />
      <Layer
        id="kml-import-line"
        type="line"
        paint={{
          "line-color": ORANGE,
          "line-width": 2,
        }}
      />
      <Layer
        id="kml-import-circle"
        type="circle"
        filter={["==", ["geometry-type"], "Point"]}
        paint={{
          "circle-color": ORANGE,
          "circle-radius": 5,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2,
        }}
      />
      <Layer
        id="kml-import-label"
        type="symbol"
        layout={{
          "text-field": ["get", "name"],
          "text-size": 13,
          "text-anchor": "center",
          "text-allow-overlap": true,
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
        }}
        paint={{
          "text-color": ORANGE,
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        }}
      />
    </Source>
  );
}
