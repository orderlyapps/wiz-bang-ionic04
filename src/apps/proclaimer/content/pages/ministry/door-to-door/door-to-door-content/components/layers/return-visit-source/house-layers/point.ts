import type { LayerProps } from "react-map-gl/mapbox";

export const getHousePointLayer = (): LayerProps => {
  return {
    id: "return-visit-house-points",
    type: "circle",
    source: "return-visits",
    minzoom: 0,
    filter: ["==", ["get", "unit_count"], 1],
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 14, 3, 16.5, 8, 18, 32],
      "circle-color": "#2563eb",
    },
  };
};
