import { useState } from "react";
import { localStorageKeyWithVariant } from "@util/constants/localStorageKeys";
import type { ParticipationType } from "../../utils/participationTypeMap";
import type { PublisherSortOrder } from "../use-publisher-sort/types";
import type { GenderFilter, PublisherFilter } from "../use-publisher-filter/usePublisherFilter";
import { DEFAULT_PRESET_ID, defaultPresets } from "./defaultPresets";
import type { FilterSortPreset } from "./types";

export type { GenderFilter, PublisherFilter };
export type { PublisherSortOrder };
export type { FilterSortPreset };

function readStoredPresets(participation_type: ParticipationType): FilterSortPreset[] {
  const key = localStorageKeyWithVariant("filterSortPresets", participation_type);
  const stored = localStorage.getItem(key);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as FilterSortPreset[];
  } catch {
    return [];
  }
}

function writeStoredPresets(participation_type: ParticipationType, presets: FilterSortPreset[]) {
  const key = localStorageKeyWithVariant("filterSortPresets", participation_type);
  localStorage.setItem(key, JSON.stringify(presets));
}

function readActivePresetId(participation_type: ParticipationType): string {
  const key = localStorageKeyWithVariant("filterSortActivePreset", participation_type);
  return localStorage.getItem(key) ?? DEFAULT_PRESET_ID;
}

function writeActivePresetId(participation_type: ParticipationType, id: string) {
  const key = localStorageKeyWithVariant("filterSortActivePreset", participation_type);
  localStorage.setItem(key, id);
}

function generateId(): string {
  return crypto.randomUUID();
}

export function usePresets(participation_type: ParticipationType | null) {
  const resolved_type = participation_type ?? "prayer";

  const [user_presets, set_user_presets] = useState<FilterSortPreset[]>(() =>
    participation_type ? readStoredPresets(participation_type) : [],
  );

  const [active_preset_id, set_active_preset_id] = useState<string>(() =>
    participation_type ? readActivePresetId(participation_type) : DEFAULT_PRESET_ID,
  );

  const default_preset = defaultPresets[resolved_type];
  const all_presets: FilterSortPreset[] = [default_preset, ...user_presets];

  const active_preset = all_presets.find((p) => p.id === active_preset_id) ?? default_preset;

  const is_default_active = active_preset.id === DEFAULT_PRESET_ID;

  function selectPreset(id: string) {
    writeActivePresetId(resolved_type, id);
    set_active_preset_id(id);
  }

  function createPreset(name: string) {
    const new_preset: FilterSortPreset = {
      id: generateId(),
      name,
      filter: active_preset.filter,
      sort_order: active_preset.sort_order,
    };
    const updated = [...user_presets, new_preset];
    writeStoredPresets(resolved_type, updated);
    set_user_presets(updated);
    writeActivePresetId(resolved_type, new_preset.id);
    set_active_preset_id(new_preset.id);
  }

  function renamePreset(id: string, name: string) {
    if (id === DEFAULT_PRESET_ID) return;
    const updated = user_presets.map((p) => (p.id === id ? { ...p, name } : p));
    writeStoredPresets(resolved_type, updated);
    set_user_presets(updated);
  }

  function deletePreset(id: string) {
    if (id === DEFAULT_PRESET_ID) return;
    const updated = user_presets.filter((p) => p.id !== id);
    writeStoredPresets(resolved_type, updated);
    set_user_presets(updated);
    if (active_preset_id === id) {
      writeActivePresetId(resolved_type, DEFAULT_PRESET_ID);
      set_active_preset_id(DEFAULT_PRESET_ID);
    }
  }

  function updatePreset(filter: PublisherFilter, sort_order: PublisherSortOrder) {
    if (active_preset.id === DEFAULT_PRESET_ID) return;
    const updated = user_presets.map((p) =>
      p.id === active_preset.id ? { ...p, filter, sort_order } : p,
    );
    writeStoredPresets(resolved_type, updated);
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
