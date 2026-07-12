import { useContext } from "react";
import { SelectedMapContext } from "../context/SelectedMapContext";

export function useSelectedMap() {
  const context = useContext(SelectedMapContext);
  if (context === undefined) {
    throw new Error("useSelectedMap must be used within a SelectedMapProvider");
  }
  return context;
}
