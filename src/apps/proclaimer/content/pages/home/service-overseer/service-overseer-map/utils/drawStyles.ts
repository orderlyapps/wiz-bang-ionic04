const MINZOOM = 10;

export const MAP_DRAW_STYLES: object[] = [
  // Polygon fill — no fill
  {
    id: "gl-draw-polygon-fill",
    type: "fill",
    filter: ["all", ["==", "$type", "Polygon"]],
    paint: {
      "fill-color": "#ff0000",
      "fill-opacity": 0,
    },
  },
  // Line and polygon stroke — red
  {
    id: "gl-draw-lines",
    type: "line",
    filter: ["any", ["==", "$type", "LineString"], ["==", "$type", "Polygon"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#ff0000",
      "line-dasharray": ["case", ["==", ["get", "active"], "true"], [0.2, 2], [2, 0]],
      "line-width": ["case", ["==", ["get", "active"], "true"], 4, 8],
    },
  },
  // Point features
  {
    id: "gl-draw-point-outer",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"], ["==", "meta", "feature"]],
    minzoom: MINZOOM,
    paint: {
      "circle-radius": ["case", ["==", ["get", "active"], "true"], 50, 10],
      "circle-color": "#ffffff",
      "circle-stroke-color": "#ff0000",
      "circle-stroke-width": ["case", ["==", ["get", "active"], "true"], 3, 2],
    },
  },
  {
    id: "gl-draw-point-inner",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"], ["==", "meta", "feature"]],
    minzoom: MINZOOM,
    paint: {
      "circle-radius": ["case", ["==", ["get", "active"], "true"], 5, 6],
      "circle-color": ["case", ["==", ["get", "active"], "true"], "#000000", "#ff0000"],
    },
  },
  // Vertices — bigger, selected vertex is 5x larger with a clear middle,
  // thick red border, and a black dot in the center.
  {
    id: "gl-draw-vertex-outer",
    type: "circle",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "meta", "vertex"],
      ["!=", "mode", "simple_select"],
    ],
    minzoom: MINZOOM,
    paint: {
      "circle-radius": ["case", ["==", ["get", "active"], "true"], 100, 16],
      "circle-color": [
        "case",
        ["==", ["get", "active"], "true"],
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
      ],
      "circle-stroke-color": "#ff0000",
      "circle-stroke-width": ["case", ["==", ["get", "active"], "true"], 3, 2],
    },
  },
  {
    id: "gl-draw-vertex-inner",
    type: "circle",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "meta", "vertex"],
      ["!=", "mode", "simple_select"],
    ],
    minzoom: MINZOOM,
    paint: {
      "circle-radius": ["case", ["==", ["get", "active"], "true"], 3, 4],
      "circle-color": ["case", ["==", ["get", "active"], "true"], "#000000", "#ff0000"],
    },
  },
  // Midpoints
  {
    id: "gl-draw-midpoint",
    type: "circle",
    filter: ["all", ["==", "meta", "midpoint"]],
    minzoom: MINZOOM,
    paint: {
      "circle-radius": 10,
      "circle-color": "rgba(0, 0, 0, 0)",
      "circle-stroke-color": "#ff0000",
      "circle-stroke-width": ["case", ["==", ["get", "active"], "true"], 2, 1],
    },
  },
];
