import { useRef, type ReactNode } from "react";
import type { MapRow } from "@shared/database/schemas/map";
import type { ZoomToFn } from "../components/map-zoom-to-controller/MapZoomToController";
import { MapZoomContext } from "./mapZoomContext";
import { useSelectedMap } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useSelectedMapContext";

interface MapZoomProviderProps {
  children: ReactNode;
}

type MapWithBoundary = MapRow & { boundary: Exclude<MapRow["boundary"], null> };

export function MapZoomProvider({ children }: MapZoomProviderProps) {
  const zoomToRef = useRef<ZoomToFn | null>(null);
  const { selectMap } = useSelectedMap();

  function zoomToMap(map: MapWithBoundary) {
    if (zoomToRef.current && map.boundary.length > 0) {
      if (map.id) {
        selectMap(map.id);
      }

      // Calculate bounds from boundary coordinates
      const lngs = map.boundary.map((coord: [number, number]) => coord[0]);
      const lats = map.boundary.map((coord: [number, number]) => coord[1]);

      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);

      // Add padding to bounds (5% of the range)
      const lngPadding = (maxLng - minLng) * 0.05;
      const latPadding = (maxLat - minLat) * 0.05;

      const bounds: [[number, number], [number, number]] = [
        [minLng - lngPadding, minLat - latPadding],
        [maxLng + lngPadding, maxLat + latPadding],
      ];

      zoomToRef.current({ bounds });
    }
  }

  return (
    <MapZoomContext.Provider value={{ zoomToRef, zoomToMap }}>{children}</MapZoomContext.Provider>
  );
}

// Export type for external use
export type { MapWithBoundary };
