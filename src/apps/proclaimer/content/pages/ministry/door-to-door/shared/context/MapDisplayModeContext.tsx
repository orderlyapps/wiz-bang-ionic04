import { createContext, useState, useEffect, type ReactNode } from "react";
import { localStorageKeys } from "@util/constants/localStorageKeys";

export type MapDisplayMode = "all" | "selected";

interface MapDisplayModeContextType {
  displayMode: MapDisplayMode;
  updateDisplayMode: (mode: MapDisplayMode) => void;
}

const DEFAULT_MAP_DISPLAY_MODE: MapDisplayMode = "all";

const MapDisplayModeContext = createContext<MapDisplayModeContextType | undefined>(undefined);

function isValidMapDisplayMode(value: string | null): value is MapDisplayMode {
  return value === "all" || value === "selected";
}

function readStoredDisplayMode(): MapDisplayMode {
  try {
    const stored = localStorage.getItem(localStorageKeys.mapDisplayMode);
    return isValidMapDisplayMode(stored) ? stored : DEFAULT_MAP_DISPLAY_MODE;
  } catch {
    return DEFAULT_MAP_DISPLAY_MODE;
  }
}

export function MapDisplayModeProvider({ children }: { children: ReactNode }) {
  const [displayMode, setDisplayMode] = useState<MapDisplayMode>(readStoredDisplayMode);

  function updateDisplayMode(mode: MapDisplayMode) {
    try {
      localStorage.setItem(localStorageKeys.mapDisplayMode, mode);
      setDisplayMode(mode);
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  // Listen for storage changes from other tabs
  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      if (e.key === localStorageKeys.mapDisplayMode) {
        setDisplayMode(isValidMapDisplayMode(e.newValue) ? e.newValue : DEFAULT_MAP_DISPLAY_MODE);
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <MapDisplayModeContext.Provider value={{ displayMode, updateDisplayMode }}>
      {children}
    </MapDisplayModeContext.Provider>
  );
}

// Export the context for the hook to use
export { MapDisplayModeContext };
