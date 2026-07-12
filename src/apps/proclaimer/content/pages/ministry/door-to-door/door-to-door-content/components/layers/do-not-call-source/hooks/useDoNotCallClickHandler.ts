import { useEffect, useRef } from "react";
import { useMap } from "react-map-gl/mapbox";
import type { MapMouseEvent } from "mapbox-gl";
import type { DoNotCall } from "../types";

const CLICKABLE_LAYERS = ["do-not-call-house-points", "do-not-call-unit-points"];

type UseDoNotCallClickHandlerProps = {
  onSelect: (doNotCall: DoNotCall) => void;
  onSelectGroup?: (groupKey: string) => void;
};

export function useDoNotCallClickHandler({
  onSelect,
  onSelectGroup,
}: UseDoNotCallClickHandlerProps) {
  const { current: map } = useMap();
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const onSelectGroupRef = useRef(onSelectGroup);
  onSelectGroupRef.current = onSelectGroup;

  useEffect(() => {
    const currentMap = map;
    if (!currentMap) return;

    function handleClick(event: MapMouseEvent) {
      if (!currentMap) return;
      const features = currentMap.queryRenderedFeatures(event.point, {
        layers: CLICKABLE_LAYERS,
      });
      const feature = features[0];
      if (!feature?.properties) return;

      const unitCount = Number(feature.properties.unit_count ?? 1);
      const groupKey = feature.properties.group_key;
      if (unitCount > 1 && onSelectGroupRef.current && typeof groupKey === "string") {
        onSelectGroupRef.current(groupKey);
        return;
      }

      const geometryCoordinates =
        feature.geometry?.type === "Point" ? feature.geometry.coordinates : null;
      const selected = {
        ...feature.properties,
        coordinates:
          Array.isArray(geometryCoordinates) && geometryCoordinates.length === 2
            ? ([geometryCoordinates[0], geometryCoordinates[1]] as [number, number])
            : (feature.properties.coordinates as [number, number]),
      };
      onSelectRef.current(selected as unknown as DoNotCall);
    }

    currentMap.on("click", handleClick);
    return () => {
      currentMap.off("click", handleClick);
    };
  }, [map]);
}
