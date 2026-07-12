import type { LayerProps } from "react-map-gl/mapbox";

export const getUnitLabelLayer = (): LayerProps => {
  return {
    id: "not-at-home-unit-labels",
    type: "symbol",
    source: "not-at-home",
    minzoom: 16,
    filter: ["case", [">", ["get", "unit_count"], 1], true, false],
    layout: {
      "text-field": [
        "concat",
        ["get", "house_number"],
        "\n",
        ["get", "return_count"],
        " unit",
        ["case", ["==", ["get", "return_count"], 1], "", "s"],
      ],
      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-size": ["interpolate", ["linear"], ["zoom"], 16.5, 5, 18, 27],
      "text-offset": [0, -0.25],
      "text-anchor": "center",
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": ["case", [">=", ["get", "return_count"], 1], "#F00", "#090"],
      "text-halo-width": 5,
    },
  };
};
