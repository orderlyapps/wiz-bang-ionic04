import type { LayerProps } from "react-map-gl/mapbox";

export const getUnitLabelLayer = (): LayerProps => {
  return {
    id: "do-not-call-unit-labels",
    type: "symbol",
    source: "do-not-calls",
    minzoom: 16,
    filter: [">", ["get", "unit_count"], 1],
    layout: {
      "text-field": ["concat", ["get", "house_number"], "\n", ["get", "unit_count"], " units"],
      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-size": ["interpolate", ["linear"], ["zoom"], 16.5, 5, 18, 27],
      "text-offset": [0, -0.25],
      "text-anchor": "center",
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": "#000000",
      "text-halo-width": 5,
    },
  };
};
