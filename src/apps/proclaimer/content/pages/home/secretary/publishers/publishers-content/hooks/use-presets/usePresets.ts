import { useState } from "react";
import { localStorageKeyWithVariant } from "@util/constants/localStorageKeys";
import { DEFAULT_PRESET_ID, defaultPresets } from "./defaultPresets";
import type { FilterSortPreset } from "./types";
import type { PublisherFilter } from "../use-publisher-filter/types";

export type { FilterSortPreset };
export type { PublisherFilter } from "../use-publisher-filter/types";

function readStoredPresets(): FilterSortPreset[] {
  const key = localStorageKeyWithVariant("filterSortPresets", "publishers");
  const stored = localStorage.getItem(key);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as FilterSortPreset[];
  } catch {
    return [];
  }
}

function writeStoredPresets(presets: FilterSortPreset[]) {
  const key = localStorageKeyWithVariant("filterSortPresets", "publishers");
  localStorage.setItem(key, JSON.stringify(presets));
}

function readActivePresetId(): string {
  const key = localStorageKeyWithVariant("filterSortActivePreset", "publishers");
  return localStorage.getItem(key) ?? DEFAULT_PRESET_ID;
}

function writeActivePresetId(id: string) {
  const key = localStorageKeyWithVariant("filterSortActivePreset", "publishers");
  localStorage.setItem(key, id);
}

function generateId(): string {
  return crypto.randomUUID();
}

export function usePresets() {
  const [user_presets, set_user_presets] = useState<FilterSortPreset[]>(() => readStoredPresets());

  const [active_preset_id, set_active_preset_id] = useState<string>(() => readActivePresetId());

  const all_presets: FilterSortPreset[] = [...defaultPresets, ...user_presets];
  const active_preset = all_presets.find((p) => p.id === active_preset_id) ?? defaultPresets[0];
  const is_default_active = defaultPresets.some((preset) => preset.id === active_preset.id);

  function selectPreset(id: string) {
    writeActivePresetId(id);
    set_active_preset_id(id);
  }

  function createPreset(name: string) {
    const new_preset: FilterSortPreset = {
      id: generateId(),
      name,
      filter: active_preset.filter,
    };
    const updated = [...user_presets, new_preset];
    writeStoredPresets(updated);
    set_user_presets(updated);
    writeActivePresetId(new_preset.id);
    set_active_preset_id(new_preset.id);
  }

  function renamePreset(id: string, name: string) {
    if (id === DEFAULT_PRESET_ID) return;
    const updated = user_presets.map((p) => (p.id === id ? { ...p, name } : p));
    writeStoredPresets(updated);
    set_user_presets(updated);
  }

  function deletePreset(id: string) {
    if (id === DEFAULT_PRESET_ID) return;
    const updated = user_presets.filter((p) => p.id !== id);
    writeStoredPresets(updated);
    set_user_presets(updated);
    if (active_preset_id === id) {
      writeActivePresetId(DEFAULT_PRESET_ID);
      set_active_preset_id(DEFAULT_PRESET_ID);
    }
  }

  function updatePreset(filter: PublisherFilter) {
    if (is_default_active) return;
    const updated = user_presets.map((p) => (p.id === active_preset.id ? { ...p, filter } : p));
    writeStoredPresets(updated);
    set_user_presets(updated);
  }

  return {
    presets: all_presets,
    active_preset,
    is_default_active,
    selectPreset,
    createPreset,
    renamePreset,
    deletePreset,
    updatePreset,
  };
}
