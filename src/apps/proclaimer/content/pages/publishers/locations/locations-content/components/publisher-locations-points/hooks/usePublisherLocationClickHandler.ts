import { useEffect, useRef } from "react";
import { useMap } from "react-map-gl/mapbox";
import type { MapMouseEvent } from "mapbox-gl";

const CLICKABLE_LAYER = "publisher-location-points";

type UsePublisherLocationClickHandlerProps = {
  onSelectGroup: (group_key: string) => void;
};

export function usePublisherLocationClickHandler({
  onSelectGroup,
}: UsePublisherLocationClickHandlerProps) {
  const { current: map } = useMap();
  const onSelectGroupRef = useRef(onSelectGroup);
  onSelectGroupRef.current = onSelectGroup;

  useEffect(() => {
    const currentMap = map;
    if (!currentMap) return;

    function handleClick(event: MapMouseEvent) {
      if (!currentMap) return;
      const features = currentMap.queryRenderedFeatures(event.point, {
        layers: [CLICKABLE_LAYER],
      });
      const feature = features[0];
      const groupKey = feature?.properties?.group_key;
      if (typeof groupKey !== "string") return;
      onSelectGroupRef.current(groupKey);
    }

    currentMap.on("click", handleClick);
    return () => {
      currentMap.off("click", handleClick);
    };
  }, [map]);
}
