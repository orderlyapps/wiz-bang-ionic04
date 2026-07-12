import { useState, useEffect } from "react";
import { localStorageKeyWithVariant } from "@util/constants/localStorageKeys";
import type {
  MapLogFilterSortPreset,
  MapLogFilters,
  MapLogSortOrder,
  CheckoutFilter,
} from "./types";
import {
  DEFAULT_PRESET_IDS,
  DEFAULT_ACTIVE_PRESET_ID,
  defaultMapLogPresets,
} from "./defaultMapLogPresets";

export type { MapLogFilterSortPreset, MapLogFilters, MapLogSortOrder };

export interface PresetDefaults {
  presets: MapLogFilterSortPreset[];
  default_preset_ids: Set<string>;
  default_active_preset_id: string;
}

const MAP_LOG_DEFAULTS: PresetDefaults = {
  presets: defaultMapLogPresets,
  default_preset_ids: DEFAULT_PRESET_IDS,
  default_active_preset_id: DEFAULT_ACTIVE_PRESET_ID,
};

const PRESET_EVENT = "map-log-presets-changed";

const VALID_CHECKOUT_FILTERS = new Set<CheckoutFilter>([
  "any",
  "checked_out_only",
  "hide_checked_out",
]);
const VALID_SORT_ORDERS = new Set<MapLogSortOrder>([
  "alphabetical",
  "recent_activity",
  "oldest_activity",
]);

function isPreset(value: unknown): value is MapLogFilterSortPreset {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Record<string, unknown>;
  if (typeof p.id !== "string" || typeof p.name !== "string") return false;
  if (typeof p.sort_order !== "string" || !VALID_SORT_ORDERS.has(p.sort_order as MapLogSortOrder))
    return false;
  if (typeof p.filter !== "object" || p.filter === null) return false;
  const f = p.filter as Record<string, unknown>;
  if (
    typeof f.checkout_filter !== "string" ||
    !VALID_CHECKOUT_FILTERS.has(f.checkout_filter as CheckoutFilter)
  )
    return false;
  if (typeof f.untagged_only !== "boolean") return false;
  if (!Array.isArray(f.tag_ids) || f.tag_ids.some((t) => typeof t !== "string")) return false;
  if (f.min_weeks_since_activity !== null && typeof f.min_weeks_since_activity !== "number")
    return false;
  return true;
}

function readStoredPresets(storage_key: string): MapLogFilterSortPreset[] {
  const stored = localStorage.getItem(storage_key);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isPreset);
  } catch {
    return [];
  }
}

function writeStoredPresets(storage_key: string, presets: MapLogFilterSortPreset[]) {
  localStorage.setItem(storage_key, JSON.stringify(presets));
  window.dispatchEvent(new CustomEvent(PRESET_EVENT, { detail: { storage_key } }));
}

function readActivePresetId(storage_key: string, default_active_id: string): string {
  return localStorage.getItem(storage_key) ?? default_active_id;
}

function writeActivePresetId(storage_key: string, id: string) {
  localStorage.setItem(storage_key, id);
  window.dispatchEvent(new CustomEvent(PRESET_EVENT, { detail: { storage_key } }));
}

export function useMapLogPresets(
  presets_storage_key: string = localStorageKeyWithVariant("mapLogFilterSortPresets", "map_log"),
  active_preset_storage_key: string = localStorageKeyWithVariant(
    "mapLogFilterSortActivePreset",
    "map_log",
  ),
  defaults: PresetDefaults = MAP_LOG_DEFAULTS,
) {
  const [user_presets, set_user_presets] = useState<MapLogFilterSortPreset[]>(() =>
    readStoredPresets(presets_storage_key),
  );
  const [active_preset_id, set_active_preset_id] = useState<string>(() =>
    readActivePresetId(active_preset_storage_key, defaults.default_active_preset_id),
  );

  useEffect(() => {
    function handlePresetChange(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.storage_key === presets_storage_key) {
        set_user_presets(readStoredPresets(presets_storage_key));
      }
      if (detail?.storage_key === active_preset_storage_key) {
        set_active_preset_id(
          readActivePresetId(active_preset_storage_key, defaults.default_active_preset_id),
        );
      }
    }
    window.addEventListener(PRESET_EVENT, handlePresetChange);
    return () => window.removeEventListener(PRESET_EVENT, handlePresetChange);
  }, [presets_storage_key, active_preset_storage_key, defaults.default_active_preset_id]);

  const all_presets: MapLogFilterSortPreset[] = [...defaults.presets, ...user_presets];
  const active_preset = all_presets.find((p) => p.id === active_preset_id) ?? defaults.presets[0];
  const is_default_active = defaults.default_preset_ids.has(active_preset.id);
  const default_active_preset = defaults.presets.find(
    (p) => p.id === defaults.default_active_preset_id,
  )!;
  const has_active_filters =
    JSON.stringify(active_preset.filter) !== JSON.stringify(default_active_preset.filter) ||
    active_preset.sort_order !== default_active_preset.sort_order;

  function selectPreset(id: string) {
    writeActivePresetId(active_preset_storage_key, id);
    set_active_preset_id(id);
  }

  function createPreset(name: string) {
    const new_preset: MapLogFilterSortPreset = {
      id: crypto.randomUUID(),
      name,
      filter: active_preset.filter,
      sort_order: active_preset.sort_order,
    };
    const updated = [...user_presets, new_preset];
    writeStoredPresets(presets_storage_key, updated);
    set_user_presets(updated);
    writeActivePresetId(active_preset_storage_key, new_preset.id);
    set_active_preset_id(new_preset.id);
  }

  function renamePreset(id: string, name: string) {
    if (defaults.default_preset_ids.has(id)) return;
    const updated = user_presets.map((p) => (p.id === id ? { ...p, name } : p));
    writeStoredPresets(presets_storage_key, updated);
    set_user_presets(updated);
  }

  function deletePreset(id: string) {
    if (defaults.default_preset_ids.has(id)) return;
    const updated = user_presets.filter((p) => p.id !== id);
    writeStoredPresets(presets_storage_key, updated);
    set_user_presets(updated);
    if (active_preset_id === id) {
      writeActivePresetId(active_preset_storage_key, defaults.default_active_preset_id);
      set_active_preset_id(defaults.default_active_preset_id);
    }
  }

  function updatePreset(filter: MapLogFilters, sort_order: MapLogSortOrder) {
    if (defaults.default_preset_ids.has(active_preset.id)) return;
    const updated = user_presets.map((p) =>
      p.id === active_preset.id ? { ...p, filter, sort_order } : p,
    );
    writeStoredPresets(presets_storage_key, updated);
    set_user_presets(updated);
  }

  return {
    presets: all_presets,
    active_preset,
    is_default_active,
    has_active_filters,
    selectPreset,
    createPreset,
    renamePreset,
    deletePreset,
    updatePreset,
  };
}
