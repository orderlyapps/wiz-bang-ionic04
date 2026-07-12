import { useEffect } from "react";
import { useMap } from "react-map-gl/mapbox";

export function useFitBoundsToPoints(points: [number, number][]) {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map || points.length === 0) return;
    const lngs = points.map((p) => p[0]);
    const lats = points.map((p) => p[1]);
    const bounds: [[number, number], [number, number]] = [
      [Math.min(...lngs), Math.min(...lats)],
      [Math.max(...lngs), Math.max(...lats)],
    ];
    map.fitBounds(bounds, { padding: 60, animate: true });
  }, [map, points]);
}
