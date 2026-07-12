import { useState, useEffect } from "react";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import type {
  MinistryMapFilterSortPreset,
  MinistryMapFilters,
  MinistryMapSortOrder,
} from "./types";
import {
  MINISTRY_DEFAULT_PRESET_IDS,
  MINISTRY_DEFAULT_ACTIVE_PRESET_ID,
  defaultMinistryMapPresets,
} from "./defaultMinistryMapPresets";

export type { MinistryMapFilterSortPreset, MinistryMapFilters, MinistryMapSortOrder };

const PRESET_EVENT = "ministry-map-presets-changed";

const VALID_SORT_ORDERS = new Set<MinistryMapSortOrder>(["alphabetical", "recent_activity"]);

function isPreset(value: unknown): value is MinistryMapFilterSortPreset {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Record<string, unknown>;
  if (typeof p.id !== "string" || typeof p.name !== "string") return false;
  if (
    typeof p.sort_order !== "string" ||
    !VALID_SORT_ORDERS.has(p.sort_order as MinistryMapSortOrder)
  )
    return false;
  if (typeof p.filter !== "object" || p.filter === null) return false;
  const f = p.filter as Record<string, unknown>;
  if (typeof f.checked_out_only !== "boolean") return false;
  if (typeof f.untagged_only !== "boolean") return false;
  if (!Array.isArray(f.tag_ids) || f.tag_ids.some((t) => typeof t !== "string")) return false;
  return true;
}

function readStoredPresets(storage_key: string): MinistryMapFilterSortPreset[] {
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

function writeStoredPresets(storage_key: string, presets: MinistryMapFilterSortPreset[]) {
  localStorage.setItem(storage_key, JSON.stringify(presets));
  window.dispatchEvent(new CustomEvent(PRESET_EVENT, { detail: { storage_key } }));
}

function readActivePresetId(storage_key: string): string {
  return localStorage.getItem(storage_key) ?? MINISTRY_DEFAULT_ACTIVE_PRESET_ID;
}

function writeActivePresetId(storage_key: string, id: string) {
  localStorage.setItem(storage_key, id);
  window.dispatchEvent(new CustomEvent(PRESET_EVENT, { detail: { storage_key } }));
}

export function useMinistryMapPresets() {
  const presets_key = localStorageKeys.ministryMapFilterSortPresets;
  const active_key = localStorageKeys.ministryMapFilterSortActivePreset;

  const [user_presets, set_user_presets] = useState<MinistryMapFilterSortPreset[]>(() =>
    readStoredPresets(presets_key),
  );
  const [active_preset_id, set_active_preset_id] = useState<string>(() =>
    readActivePresetId(active_key),
  );

  useEffect(() => {
    function handlePresetChange(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.storage_key === presets_key) {
        set_user_presets(readStoredPresets(presets_key));
      }
      if (detail?.storage_key === active_key) {
        set_active_preset_id(readActivePresetId(active_key));
      }
    }
    window.addEventListener(PRESET_EVENT, handlePresetChange);
    return () => window.removeEventListener(PRESET_EVENT, handlePresetChange);
  }, [presets_key, active_key]);

  const all_presets: MinistryMapFilterSortPreset[] = [
    ...defaultMinistryMapPresets,
    ...user_presets,
  ];
  const active_preset =
    all_presets.find((p) => p.id === active_preset_id) ?? defaultMinistryMapPresets[0];
  const is_default_active = MINISTRY_DEFAULT_PRESET_IDS.has(active_preset.id);
  const default_active_preset = defaultMinistryMapPresets.find(
    (p) => p.id === MINISTRY_DEFAULT_ACTIVE_PRESET_ID,
  )!;
  const has_active_filters =
    JSON.stringify(active_preset.filter) !== JSON.stringify(default_active_preset.filter) ||
    active_preset.sort_order !== default_active_preset.sort_order;

  function selectPreset(id: string) {
    writeActivePresetId(active_key, id);
    set_active_preset_id(id);
  }

  function createPreset(name: string) {
    const new_preset: MinistryMapFilterSortPreset = {
      id: crypto.randomUUID(),
      name,
      filter: active_preset.filter,
      sort_order: active_preset.sort_order,
    };
    const updated = [...user_presets, new_preset];
    writeStoredPresets(presets_key, updated);
    set_user_presets(updated);
    writeActivePresetId(active_key, new_preset.id);
    set_active_preset_id(new_preset.id);
  }

  function renamePreset(id: string, name: string) {
    if (MINISTRY_DEFAULT_PRESET_IDS.has(id)) return;
    const updated = user_presets.map((p) => (p.id === id ? { ...p, name } : p));
    writeStoredPresets(presets_key, updated);
    set_user_presets(updated);
  }

  function deletePreset(id: string) {
    if (MINISTRY_DEFAULT_PRESET_IDS.has(id)) return;
    const updated = user_presets.filter((p) => p.id !== id);
    writeStoredPresets(presets_key, updated);
    set_user_presets(updated);
    if (active_preset_id === id) {
      writeActivePresetId(active_key, MINISTRY_DEFAULT_ACTIVE_PRESET_ID);
      set_active_preset_id(MINISTRY_DEFAULT_ACTIVE_PRESET_ID);
    }
  }

  function updatePreset(filter: MinistryMapFilters, sort_order: MinistryMapSortOrder) {
    if (MINISTRY_DEFAULT_PRESET_IDS.has(active_preset.id)) return;
    const updated = user_presets.map((p) =>
      p.id === active_preset.id ? { ...p, filter, sort_order } : p,
    );
    writeStoredPresets(presets_key, updated);
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
