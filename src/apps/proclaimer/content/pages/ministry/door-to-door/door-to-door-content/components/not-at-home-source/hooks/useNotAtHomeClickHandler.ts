import { useEffect, useRef } from "react";
import { useMap } from "react-map-gl/mapbox";
import type { MapMouseEvent } from "mapbox-gl";
import { SOURCE_ID } from "../NotAtHomeSource";
import type { NotAtHome } from "../types";

const CLICKABLE_LAYERS = [
  "not-at-home-house-points",
  "not-at-home-unit-points",
  "not-at-home-cluster-points",
];

type UseNotAtHomeClickHandlerProps = {
  onSelect: (notAtHome: NotAtHome) => void;
  onSelectUnits: (groupKey: string) => void;
};

export function useNotAtHomeClickHandler({
  onSelect,
  onSelectUnits,
}: UseNotAtHomeClickHandlerProps) {
  const { current: map } = useMap();
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const onSelectUnitsRef = useRef(onSelectUnits);
  onSelectUnitsRef.current = onSelectUnits;

  useEffect(() => {
    const currentMap = map;
    if (!currentMap) return;

    function handleClick(event: MapMouseEvent) {
      if (!currentMap) return;
      const features = currentMap.queryRenderedFeatures(event.point, {
        layers: CLICKABLE_LAYERS,
      });
      const feature = features[0];
      if (!feature) return;

      const properties = feature.properties;
      if (!properties) return;

      const layerId = feature.layer?.id;

      if (layerId === "not-at-home-house-points") {
        const geometryCoordinates =
          feature.geometry?.type === "Point" ? feature.geometry.coordinates : null;
        const selected = {
          ...properties,
          coordinates:
            Array.isArray(geometryCoordinates) && geometryCoordinates.length === 2
              ? ([geometryCoordinates[0], geometryCoordinates[1]] as [number, number])
              : (properties.coordinates as [number, number]),
        };
        onSelectRef.current(selected as unknown as NotAtHome);
        return;
      }

      if (layerId === "not-at-home-unit-points") {
        const groupKey = properties.group_key;
        if (typeof groupKey === "string") {
          onSelectUnitsRef.current(groupKey);
        }
        return;
      }

      if (layerId === "not-at-home-cluster-points") {
        const clusterId = properties.cluster_id;
        if (typeof clusterId === "number") {
          const source = currentMap.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource | undefined;
          if (!source) return;
          source.getClusterExpansionZoom(clusterId, (error, zoom) => {
            if (error || zoom == null || !currentMap) return;
            currentMap.flyTo({
              center: event.lngLat,
              zoom,
            });
          });
        } else {
          onSelectRef.current(properties as unknown as NotAtHome);
        }
      }
    }

    currentMap.on("click", handleClick);
    return () => {
      currentMap.off("click", handleClick);
    };
  }, [map]);
}
