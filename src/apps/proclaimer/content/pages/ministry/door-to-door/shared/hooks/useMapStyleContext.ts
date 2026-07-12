import { useContext } from "react";
import { MapStyleContext } from "../context/MapStyleContext";

export function useMapStyle() {
  const context = useContext(MapStyleContext);
  if (context === undefined) {
    throw new Error("useMapStyle must be used within a MapStyleProvider");
  }
  return context;
}
