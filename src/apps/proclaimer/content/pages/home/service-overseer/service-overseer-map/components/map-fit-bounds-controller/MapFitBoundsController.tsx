import { useEffect } from "react";
import { useMap } from "react-map-gl/mapbox";
import type { LngLatBoundsLike } from "mapbox-gl";

export type FitBoundsFn = (bounds: LngLatBoundsLike) => void;

type Props = {
  fitBoundsRef: React.MutableRefObject<FitBoundsFn | null>;
};

export function MapFitBoundsController({ fitBoundsRef }: Props) {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;
    fitBoundsRef.current = (bounds) => {
      map.fitBounds(bounds, { padding: 60, animate: true });
    };
    return () => {
      fitBoundsRef.current = null;
    };
  }, [map, fitBoundsRef]);

  return null;
}
