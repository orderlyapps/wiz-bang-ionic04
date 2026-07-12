import type { LayerProps } from "react-map-gl/mapbox";

export const getClusterLabelLayer = (): LayerProps => {
  return {
    id: "not-at-home-cluster-labels",
    type: "symbol",
    source: "not-at-home",
    filter: [
      "case",
      ["has", "point_count"],
      ["case", [">=", ["get", "return_count"], 1], true, false],
      ["case", ["==", ["get", "write"], false], true, false],
    ],
    maxzoom: 14,
    layout: {
      "text-field": ["case", ["has", "point_count"], ["concat", ["get", "return_count"]], "1"],
      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-size": [
        "case",
        ["has", "point_count"],
        ["interpolate", ["linear"], ["get", "return_count"], 0, 13, 500, 90],
        12,
      ],
      "text-offset": [0, 0],
      "text-anchor": "center",
    },
    paint: {
      "text-color": "#ffffff",
      "text-halo-color": "#4a6da7",
      "text-halo-width": 5,
    },
  };
};
