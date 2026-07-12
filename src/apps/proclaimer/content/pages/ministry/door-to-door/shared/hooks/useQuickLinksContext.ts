import { useContext } from "react";
import { QuickLinksContext } from "../context/QuickLinksContext";

export function useQuickLinks() {
  const context = useContext(QuickLinksContext);
  if (context === undefined) {
    throw new Error("useQuickLinks must be used within a QuickLinksProvider");
  }
  return context;
}
