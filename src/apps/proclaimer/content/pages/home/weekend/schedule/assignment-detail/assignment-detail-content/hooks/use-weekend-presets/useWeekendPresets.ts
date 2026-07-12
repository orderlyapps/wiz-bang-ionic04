import { useState } from "react";
import { localStorageKeyWithVariant } from "@util/constants/localStorageKeys";
import type { WeekendFilterSortPreset, WeekendPublisherFilter, PublisherSortOrder } from "./types";
import { DEFAULT_WEEKEND_PRESET_ID, makeDefaultWeekendPreset } from "./defaultWeekendPreset";

export type { WeekendFilterSortPreset, WeekendPublisherFilter, PublisherSortOrder };

const STORAGE_KEY = "filterSortPresets";
const ACTIVE_KEY = "filterSortActivePreset";

function readStoredPresets(assignment_id: string): WeekendFilterSortPreset[] {
  const stored = localStorage.getItem(
    localStorageKeyWithVariant(STORAGE_KEY, `weekend_${assignment_id}`),
  );
  if (!stored) return [];
  try {
    return JSON.parse(stored) as WeekendFilterSortPreset[];
  } catch {
    return [];
  }
}

function writeStoredPresets(assignment_id: string, presets: WeekendFilterSortPreset[]) {
  localStorage.setItem(
    localStorageKeyWithVariant(STORAGE_KEY, `weekend_${assignment_id}`),
    JSON.stringify(presets),
  );
}

function readActivePresetId(assignment_id: string): string {
  return (
    localStorage.getItem(localStorageKeyWithVariant(ACTIVE_KEY, `weekend_${assignment_id}`)) ??
    DEFAULT_WEEKEND_PRESET_ID
  );
}

function writeActivePresetId(assignment_id: string, id: string) {
  localStorage.setItem(localStorageKeyWithVariant(ACTIVE_KEY, `weekend_${assignment_id}`), id);
}

export function useWeekendPresets(assignment_id: string) {
  const [user_presets, set_user_presets] = useState<WeekendFilterSortPreset[]>(() =>
    readStoredPresets(assignment_id),
  );
  const [active_preset_id, set_active_preset_id] = useState<string>(() =>
    readActivePresetId(assignment_id),
  );

  const default_preset = makeDefaultWeekendPreset(assignment_id);
  const all_presets: WeekendFilterSortPreset[] = [default_preset, ...user_presets];
  const active_preset = all_presets.find((p) => p.id === active_preset_id) ?? default_preset;
  const is_default_active = active_preset.id === DEFAULT_WEEKEND_PRESET_ID;

  function selectPreset(id: string) {
    writeActivePresetId(assignment_id, id);
    set_active_preset_id(id);
  }

  function createPreset(name: string) {
    const new_preset: WeekendFilterSortPreset = {
      id: crypto.randomUUID(),
      name,
      filter: active_preset.filter,
      sort_order: active_preset.sort_order,
    };
    const updated = [...user_presets, new_preset];
    writeStoredPresets(assignment_id, updated);
    set_user_presets(updated);
    writeActivePresetId(assignment_id, new_preset.id);
    set_active_preset_id(new_preset.id);
  }

  function renamePreset(id: string, name: string) {
    if (id === DEFAULT_WEEKEND_PRESET_ID) return;
    const updated = user_presets.map((p) => (p.id === id ? { ...p, name } : p));
    writeStoredPresets(assignment_id, updated);
    set_user_presets(updated);
  }

  function deletePreset(id: string) {
    if (id === DEFAULT_WEEKEND_PRESET_ID) return;
    const updated = user_presets.filter((p) => p.id !== id);
    writeStoredPresets(assignment_id, updated);
    set_user_presets(updated);
    if (active_preset_id === id) {
      writeActivePresetId(assignment_id, DEFAULT_WEEKEND_PRESET_ID);
      set_active_preset_id(DEFAULT_WEEKEND_PRESET_ID);
    }
  }

  function updatePreset(filter: WeekendPublisherFilter, sort_order: PublisherSortOrder) {
    if (active_preset.id === DEFAULT_WEEKEND_PRESET_ID) return;
    const updated = user_presets.map((p) =>
      p.id === active_preset.id ? { ...p, filter, sort_order } : p,
    );
    writeStoredPresets(assignment_id, updated);
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
