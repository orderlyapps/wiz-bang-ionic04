import { useContext } from "react";
import { MapDisplayModeContext } from "../context/MapDisplayModeContext";

export type MapDisplayMode = "all" | "selected";

export function useMapDisplayMode() {
  const context = useContext(MapDisplayModeContext);
  if (context === undefined) {
    throw new Error("useMapDisplayMode must be used within a MapDisplayModeProvider");
  }
  return context;
}
