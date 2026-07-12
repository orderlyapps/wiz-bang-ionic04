import { Source, Layer } from "react-map-gl/mapbox";
import { useMapMasterBoundary } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/layers/map-master-layer/hooks/useMapMasterBoundary";
import { MIN_VERTEX_ZOOM } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/layers/mapLayerConstants";

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
      <Layer
        id="boundary-vertices"
        type="circle"
        minzoom={MIN_VERTEX_ZOOM}
        paint={{
          "circle-color": "#3b82f6",
          "circle-radius": 6,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2,
        }}
      />
    </Source>
  );
}
