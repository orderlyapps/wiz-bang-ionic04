import { Source, Layer } from "react-map-gl/mapbox";
import { useMapMasterBoundary } from "./hooks/useMapMasterBoundary";

export function MapMasterLayer() {
  const geojson = useMapMasterBoundary();
  return (
    <Source id="map-master" type="geojson" data={geojson}>
      <Layer
        id="boundary-line"
        type="line"
        paint={{
          "line-color": "#3b82f6",
          "line-width": 2,
        }}
      />
    </Source>
  );
}
