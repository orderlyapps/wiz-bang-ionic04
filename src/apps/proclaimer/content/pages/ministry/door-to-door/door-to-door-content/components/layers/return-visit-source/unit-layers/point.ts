import type { LayerProps } from "react-map-gl/mapbox";

export const getUnitPointLayer = (): LayerProps => {
  return {
    id: "return-visit-unit-points",
    type: "circle",
    source: "return-visits",
    minzoom: 14,
    filter: [">", ["get", "unit_count"], 1],
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 14, 4, 16.5, 10, 18, 55],
      "circle-color": "#2563eb",
    },
  };
};
