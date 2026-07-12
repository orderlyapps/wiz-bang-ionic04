import { createContext, useState, useEffect, type ReactNode } from "react";
import { localStorageKeys } from "@util/constants/localStorageKeys";

interface SelectedMapContextType {
  selectedMapId: string | null;
  selectMap: (mapId: string) => void;
  clearSelectedMap: () => void;
}

const SelectedMapContext = createContext<SelectedMapContextType | undefined>(undefined);

export function SelectedMapProvider({ children }: { children: ReactNode }) {
  const [selectedMapId, setSelectedMapId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(localStorageKeys.selectedMapId);
    } catch {
      return null;
    }
  });

  function selectMap(mapId: string) {
    try {
      localStorage.setItem(localStorageKeys.selectedMapId, mapId);
      setSelectedMapId(mapId);
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  function clearSelectedMap() {
    try {
      localStorage.removeItem(localStorageKeys.selectedMapId);
      setSelectedMapId(null);
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  // Listen for storage changes from other tabs
  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      if (e.key === localStorageKeys.selectedMapId) {
        setSelectedMapId(e.newValue);
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <SelectedMapContext.Provider value={{ selectedMapId, selectMap, clearSelectedMap }}>
      {children}
    </SelectedMapContext.Provider>
  );
}

// Export the context for the hook to use
export { SelectedMapContext };
