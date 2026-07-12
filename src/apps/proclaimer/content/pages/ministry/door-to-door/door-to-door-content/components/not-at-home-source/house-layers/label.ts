import type { LayerProps } from "react-map-gl/mapbox";

export const getHouseLabelLayer = (): LayerProps => {
  return {
    id: "not-at-home-house-labels",
    type: "symbol",
    source: "not-at-home",
    minzoom: 16,
    filter: ["case", ["==", ["get", "unit_count"], 1], true, false],
    layout: {
      "text-field": [
        "concat",
        [
          "case",
          ["to-boolean", ["get", "unit_number"]],
          ["concat", ["get", "unit_number"], "/"],
          "",
        ],
        ["get", "house_number"],
      ],
      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-size": ["interpolate", ["linear"], ["zoom"], 16.5, 6, 18, 30],
      "text-offset": [0, 0],
      "text-anchor": "center",
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": ["case", ["==", ["get", "write"], false], "#F00", "#090"],
      "text-halo-width": 5,
    },
  };
};
