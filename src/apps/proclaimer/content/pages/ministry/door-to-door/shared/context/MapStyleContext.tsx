import { createContext, useState, type ReactNode } from "react";
import { localStorageKeyWithVariant } from "@util/constants/localStorageKeys";
import { selectableStyles, type SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";

interface MapStyleContextType {
  styleId: SelectableStyleId;
  updateStyleId: (id: SelectableStyleId) => void;
}

const DEFAULT_STYLE_ID: SelectableStyleId = "custom";

const DOOR_TO_DOOR_MAP_STYLE_KEY = localStorageKeyWithVariant("mapStyle", "door-to-door");

const MapStyleContext = createContext<MapStyleContextType | undefined>(undefined);

function isSelectableStyleId(value: string | null): value is SelectableStyleId {
  return selectableStyles.some((s) => s.id === value);
}

function readStoredStyleId(): SelectableStyleId {
  try {
    const stored = localStorage.getItem(DOOR_TO_DOOR_MAP_STYLE_KEY);
    return isSelectableStyleId(stored) ? stored : DEFAULT_STYLE_ID;
  } catch {
    return DEFAULT_STYLE_ID;
  }
}

export function MapStyleProvider({ children }: { children: ReactNode }) {
  const [styleId, setStyleId] = useState<SelectableStyleId>(readStoredStyleId);

  function updateStyleId(id: SelectableStyleId) {
    try {
      localStorage.setItem(DOOR_TO_DOOR_MAP_STYLE_KEY, id);
      setStyleId(id);
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  return (
    <MapStyleContext.Provider value={{ styleId, updateStyleId }}>
      {children}
    </MapStyleContext.Provider>
  );
}

export { MapStyleContext };
