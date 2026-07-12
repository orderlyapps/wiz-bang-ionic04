import { useCallback, useState, useEffect } from "react";
import { getRecentMaps, addRecentMap } from "../utils/recentMapsStorage";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import type { MapRow } from "@shared/database/schemas/map";

type MapWithBoundary = MapRow & { boundary: number[][] };

export function useRecentMaps() {
  const [recentMaps, setRecentMaps] = useState(() => getRecentMaps());

  const addToRecentMaps = useCallback((map: MapWithBoundary) => {
    addRecentMap(map);
    setRecentMaps(getRecentMaps());
  }, []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === localStorageKeys.recentMaps) {
        setRecentMaps(getRecentMaps());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    recentMaps,
    addToRecentMaps,
  };
}
