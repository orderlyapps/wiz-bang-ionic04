import { Layer, Source, type LayerProps } from "react-map-gl/mapbox";
import { usePublisherAddressPoints } from "./hooks/usePublisherAddressPoints";
import { useFitBoundsToPoints } from "./hooks/useFitBoundsToPoints";

const SOURCE_ID = "publisher-locations";

const heatmapLayer: LayerProps = {
  id: "publisher-locations-heatmap",
  type: "heatmap",
  source: SOURCE_ID,
  paint: {
    "heatmap-weight": 0.1,
    "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 15, 3],
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(33,102,172,0)",
      0.05,
      "rgb(103,169,207)",
      0.1,
      "rgb(209,229,240)",
      0.2,
      "rgb(253,219,119)",
      0.3,
      "rgb(239,138,98)",
      1,
      "rgb(178,24,43)",
    ],
    "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 5, 1, 22, 60],
    "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 10, 1, 12, 0],
  },
};

export function PublisherLocationsHeatmap({ group_id }: { group_id?: string | null }) {
  const points = usePublisherAddressPoints(group_id);
  useFitBoundsToPoints(points?.map((p) => p.coordinates) ?? []);
  if (!points || points.length === 0) return null;

  const geojson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: points.map((point) => ({
      type: "Feature",
      id: `${point.publisher_id}-${point.address_id}`,
      properties: {
        publisher_id: point.publisher_id,
        address_id: point.address_id,
      },
      geometry: {
        type: "Point",
        coordinates: point.coordinates,
      },
    })),
  };

  return (
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...heatmapLayer} />
    </Source>
  );
}
