import type { LayerProps } from "react-map-gl/mapbox";

export const getUnitPointLayer = (): LayerProps => {
  return {
    id: "not-at-home-unit-points",
    type: "circle",
    source: "not-at-home",
    minzoom: 14,
    filter: ["case", [">", ["get", "unit_count"], 1], true, false],
    paint: {
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 14, 4, 16.5, 10, 18, 55],
      "circle-color": ["case", [">=", ["get", "return_count"], 1], "#F00", "#090"],
    },
  };
};
