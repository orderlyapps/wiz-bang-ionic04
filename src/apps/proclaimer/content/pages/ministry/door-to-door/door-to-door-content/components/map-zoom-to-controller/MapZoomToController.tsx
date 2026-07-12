import { useEffect } from "react";
import { useMap } from "react-map-gl/mapbox";

export type ZoomToFn = (
  coordinates: [number, number] | { bounds: [[number, number], [number, number]] },
) => void;

type MapZoomToControllerProps = {
  zoomToRef: React.MutableRefObject<ZoomToFn | null>;
};

export function MapZoomToController({ zoomToRef }: MapZoomToControllerProps) {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;
    zoomToRef.current = (coordinates) => {
      if (Array.isArray(coordinates)) {
        // Single point zoom
        map.flyTo({ center: coordinates, zoom: 17 });
      } else if ("bounds" in coordinates) {
        // Bounds-based zoom
        map.fitBounds(coordinates.bounds, {
          padding: 20,
          maxZoom: 18,
        });
      }
    };
    return () => {
      zoomToRef.current = null;
    };
  }, [map, zoomToRef]);

  return null;
}
