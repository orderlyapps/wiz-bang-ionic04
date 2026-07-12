import { useState } from "react";
import type { ViewState, ViewStateChangeEvent } from "react-map-gl/mapbox";
import { localStorageKeys, localStorageKeyWithVariant } from "@util/constants/localStorageKeys";
import { selectableStyles, type SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";

type StoredLocation = Pick<ViewState, "longitude" | "latitude" | "zoom" | "pitch" | "bearing">;

function isSelectableStyleId(value: string): value is SelectableStyleId {
  return selectableStyles.some((s) => s.id === value);
}

function storageKey(id?: string): string {
  return id ? localStorageKeyWithVariant("mapViewLocation", id) : localStorageKeys.mapViewLocation;
}

function loadLocation(id?: string): StoredLocation | null {
  try {
    const raw = localStorage.getItem(storageKey(id));
    return raw ? (JSON.parse(raw) as StoredLocation) : null;
  } catch {
    return null;
  }
}

function saveLocation(location: StoredLocation, id?: string): void {
  localStorage.setItem(storageKey(id), JSON.stringify(location));
}

function styleStorageKey(id?: string): string {
  return id ? localStorageKeyWithVariant("mapStyle", id) : localStorageKeys.mapStyle;
}

function loadStyleId(id?: string, fallback: SelectableStyleId = "custom"): SelectableStyleId {
  try {
    const raw = localStorage.getItem(styleStorageKey(id));
    if (raw && isSelectableStyleId(raw)) {
      return raw;
    }
  } catch {
    /* ignore */
  }
  return fallback;
}

function saveStyleId(styleId: SelectableStyleId, id?: string): void {
  localStorage.setItem(styleStorageKey(id), styleId);
}

type UseMapLocationResult = {
  viewState: StoredLocation;
  styleId: SelectableStyleId;
  setStyleId: (id: SelectableStyleId) => void;
  onMove: (evt: ViewStateChangeEvent) => void;
};

export function useMapLocation(
  initial: Partial<ViewState>,
  initialStyleId: SelectableStyleId,
  id?: string,
): UseMapLocationResult {
  const [viewState, setViewState] = useState<StoredLocation>(() => {
    const stored = loadLocation(id);
    return {
      longitude: stored?.longitude ?? initial.longitude ?? 0,
      latitude: stored?.latitude ?? initial.latitude ?? 20,
      zoom: stored?.zoom ?? initial.zoom ?? 1.5,
      pitch: stored?.pitch ?? initial.pitch ?? 0,
      bearing: stored?.bearing ?? initial.bearing ?? 0,
    };
  });

  function onMove(evt: ViewStateChangeEvent) {
    const { longitude, latitude, zoom, pitch, bearing } = evt.viewState;
    const next: StoredLocation = {
      longitude,
      latitude,
      zoom,
      pitch,
      bearing,
    };
    setViewState(next);
    saveLocation(next, id);
  }

  const [styleId, setStyleIdState] = useState<SelectableStyleId>(() =>
    loadStyleId(id, initialStyleId),
  );

  function setStyleId(nextStyleId: SelectableStyleId) {
    setStyleIdState(nextStyleId);
    saveStyleId(nextStyleId, id);
  }

  return { viewState, styleId, setStyleId, onMove };
}
