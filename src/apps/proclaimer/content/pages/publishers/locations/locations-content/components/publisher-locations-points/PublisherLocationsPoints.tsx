import { useState } from "react";
import { Source, Layer, type LayerProps } from "react-map-gl/mapbox";
import {
  useGroupedPublisherLocations,
  type AddressPublisherGroup,
} from "./hooks/useGroupedPublisherLocations";
import { PublisherLocationClickHandler } from "./components/publisher-location-click-handler/PublisherLocationClickHandler";
import { PublisherLocationsModal } from "./components/publisher-locations-modal/PublisherLocationsModal";

export const SOURCE_ID = "publisher-locations-points";

const pointLayer: LayerProps = {
  id: "publisher-location-points",
  type: "circle",
  source: SOURCE_ID,
  minzoom: 11,
  paint: {
    "circle-radius": ["interpolate", ["linear"], ["zoom"], 10.5, 0, 14, 4, 16, 8, 18, 50],
    "circle-color": "#3b82f6",
  },
};

const countLayer: LayerProps = {
  id: "publisher-location-counts",
  type: "symbol",
  source: SOURCE_ID,
  minzoom: 14,
  // filter: [">", ["get", "publisher_count"], 1],
  layout: {
    "text-field": ["get", "publisher_count"],
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": ["interpolate", ["linear"], ["zoom"], 10.5, 0, 14, 4, 16, 8, 18, 50],
    "text-anchor": "center",
  },
  paint: {
    "text-color": "#ffffff",
  },
};

export function PublisherLocationsPoints({ group_id }: { group_id?: string | null }) {
  const groups = useGroupedPublisherLocations(group_id);
  const [selectedGroup, setSelectedGroup] = useState<AddressPublisherGroup | null>(null);

  if (!groups || groups.length === 0) return null;

  const groupMap = new Map(groups.map((group) => [group.group_key, group]));
  const geojson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: groups.map((group) => ({
      type: "Feature",
      id: group.group_key,
      properties: {
        group_key: group.group_key,
        publisher_count: group.publishers.length,
      },
      geometry: {
        type: "Point",
        coordinates: group.coordinates,
      },
    })),
  };

  return (
    <>
      <Source id={SOURCE_ID} type="geojson" data={geojson}>
        <Layer {...pointLayer} />
        <Layer {...countLayer} />
        <PublisherLocationClickHandler
          onSelectGroup={(group_key) => setSelectedGroup(groupMap.get(group_key) ?? null)}
        />
      </Source>
      <PublisherLocationsModal group={selectedGroup} onDismiss={() => setSelectedGroup(null)} />
    </>
  );
}
