import { useEffect, useRef } from "react";
import { useMap } from "react-map-gl/mapbox";
import type { MapMouseEvent } from "mapbox-gl";
import { returnVisitCollection } from "@shared/database/collections/return-visit";
import { streetCollection } from "@shared/database/collections/street";
import { suburbCollection } from "@shared/database/collections/suburb";
import type { ReturnVisit } from "../types";

const CLICKABLE_LAYERS = ["return-visit-house-points", "return-visit-unit-points"];

type UseReturnVisitClickHandlerProps = {
  onSelect: (returnVisit: ReturnVisit) => void;
  onSelectGroup?: (groupKey: string) => void;
};

export function useReturnVisitClickHandler({
  onSelect,
  onSelectGroup,
}: UseReturnVisitClickHandlerProps) {
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

      const id = feature.properties.id as string | undefined;
      if (!id) return;
      const record = returnVisitCollection.get(id);
      if (!record) return;

      const street = streetCollection.get(record.street_id);
      const suburb = suburbCollection.get(record.suburb_id);

      const selected: ReturnVisit = {
        ...record,
        street: street?.name ?? "",
        suburb: suburb?.name ?? "",
      };
      onSelectRef.current(selected);
    }

    currentMap.on("click", handleClick);
    return () => {
      currentMap.off("click", handleClick);
    };
  }, [map]);
}
