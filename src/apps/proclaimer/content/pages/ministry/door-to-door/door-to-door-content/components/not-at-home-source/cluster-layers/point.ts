import type { LayerProps } from "react-map-gl/mapbox";

export const getClusterPointLayer = (): LayerProps => {
  return {
    id: "not-at-home-cluster-points",
    type: "circle",
    source: "not-at-home",
    maxzoom: 14,
    filter: [
      "case",
      ["has", "point_count"],
      ["case", [">=", ["get", "return_count"], 1], true, false],
      ["case", ["==", ["get", "write"], false], true, false],
    ],
    paint: {
      "circle-radius": [
        "case",
        ["has", "point_count"],
        ["interpolate", ["linear"], ["get", "return_count"], 0, 10, 500, 100],
        8,
      ],
      "circle-color": "#4a6da7",
    },
  };
};
