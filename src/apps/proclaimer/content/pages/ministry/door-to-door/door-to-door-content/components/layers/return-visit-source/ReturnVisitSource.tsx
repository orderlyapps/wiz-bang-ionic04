import { Source, Layer } from "react-map-gl/mapbox";
import { useReturnVisitMarkers } from "./hooks/useReturnVisitMarkers";
import { getHousePointLayer } from "./house-layers/point";
import { getHouseLabelLayer } from "./house-layers/label";
import { getUnitPointLayer } from "./unit-layers/point";
import { getUnitLabelLayer } from "./unit-layers/label";
import { ReturnVisitClickHandler } from "./components/return-visit-click-handler/ReturnVisitClickHandler";
import type { ReturnVisit } from "./types";

export const SOURCE_ID = "return-visits";

type ReturnVisitWithCoordinates = ReturnVisit & { coordinates: [number, number] };

type ReturnVisitFeature = {
  type: "Feature";
  id?: string;
  properties: ReturnVisitWithCoordinates & { unit_count: number; group_key: string };
  geometry: { type: "Point"; coordinates: [number, number] };
};

type ReturnVisitSourceProps = {
  onSelect: (returnVisit: ReturnVisit) => void;
  onSelectGroup?: (groupKey: string) => void;
};

export function ReturnVisitSource({ onSelect, onSelectGroup }: ReturnVisitSourceProps) {
  const groupedByAddress = useReturnVisitMarkers();
  if (!groupedByAddress) return null;

  const features: ReturnVisitFeature[] = Object.entries(groupedByAddress).map(
    ([groupKey, group]) => {
      const firstItem = group[0];
      return {
        type: "Feature",
        id: firstItem.id,
        properties: {
          ...firstItem,
          unit_count: group.length,
          group_key: groupKey,
        },
        geometry: {
          type: "Point",
          coordinates: firstItem.coordinates,
        },
      };
    },
  );

  const geojson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features,
  };

  return (
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...getUnitPointLayer()} />
      <Layer {...getUnitLabelLayer()} />
      <Layer {...getHousePointLayer()} />
      <Layer {...getHouseLabelLayer()} />
      <ReturnVisitClickHandler onSelect={onSelect} onSelectGroup={onSelectGroup} />
    </Source>
  );
}
