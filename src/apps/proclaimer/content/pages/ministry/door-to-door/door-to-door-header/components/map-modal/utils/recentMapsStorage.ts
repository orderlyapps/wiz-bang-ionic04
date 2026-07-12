import type { MapRow } from "@shared/database/schemas/map";
import { localStorageKeys } from "@util/constants/localStorageKeys";

type MapWithBoundary = MapRow & { boundary: number[][] };

const MAX_RECENT_MAPS = 5;

interface RecentMap {
  id: string;
  name: string;
  details: string | null;
  selectedAt: string;
}

export function getRecentMaps(): RecentMap[] {
  try {
    const stored = localStorage.getItem(localStorageKeys.recentMaps);
    if (!stored) return [];

    const maps = JSON.parse(stored) as RecentMap[];
    return maps.sort((a, b) => new Date(b.selectedAt).getTime() - new Date(a.selectedAt).getTime());
  } catch {
    return [];
  }
}

export function addRecentMap(map: MapWithBoundary): void {
  try {
    const recentMaps = getRecentMaps();

    // Remove if already exists
    const filteredMaps = recentMaps.filter((m) => m.id !== map.id);

    // Add new map to beginning
    const newRecentMap: RecentMap = {
      id: map.id!,
      name: map.name,
      details: map.details ?? null,
      selectedAt: new Date().toISOString(),
    };

    const updatedMaps = [newRecentMap, ...filteredMaps].slice(0, MAX_RECENT_MAPS);

    localStorage.setItem(localStorageKeys.recentMaps, JSON.stringify(updatedMaps));
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function clearRecentMaps(): void {
  try {
    localStorage.removeItem(localStorageKeys.recentMaps);
  } catch {
    // Silently fail if localStorage is not available
  }
}
