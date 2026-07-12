import { createContext, useContext } from "react";
import type { MapRow } from "@shared/database/schemas/map";
import type { ZoomToFn } from "../components/map-zoom-to-controller/MapZoomToController";

type MapWithBoundary = MapRow & { boundary: number[][] };

interface MapZoomContextType {
  zoomToRef: React.MutableRefObject<ZoomToFn | null>;
  zoomToMap: (map: MapWithBoundary) => void;
}

export const MapZoomContext = createContext<MapZoomContextType | undefined>(undefined);

export function useMapZoom() {
  const context = useContext(MapZoomContext);
  if (context === undefined) {
    throw new Error("useMapZoom must be used within a MapZoomProvider");
  }
  return context;
}
