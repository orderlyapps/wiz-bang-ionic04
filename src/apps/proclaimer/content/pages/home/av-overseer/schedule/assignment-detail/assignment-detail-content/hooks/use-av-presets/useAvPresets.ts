import { useState } from "react";
import { localStorageKeyWithVariant } from "@util/constants/localStorageKeys";
import type { AvParticipationType } from "../../utils/avParticipationTypeMap";
import type { AvFilterSortPreset, AvPublisherFilter } from "./types";
import type { PublisherSortOrder } from "@proclaimer-content/pages/home/clam-overseer/schedule/assignment-detail/assignment-detail-content/components/publisher-selector/hooks/use-publisher-sort/types";
import { DEFAULT_AV_PRESET_ID, defaultAvPresets } from "./defaultAvPresets";

export type { AvPublisherFilter, AvFilterSortPreset };
export type { PublisherSortOrder };

function readStoredPresets(participation_type: AvParticipationType): AvFilterSortPreset[] {
  const key = localStorageKeyWithVariant("avFilterSortPresets", participation_type);
  const stored = localStorage.getItem(key);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as AvFilterSortPreset[];
  } catch {
    return [];
  }
}

function writeStoredPresets(
  participation_type: AvParticipationType,
  presets: AvFilterSortPreset[],
) {
  const key = localStorageKeyWithVariant("avFilterSortPresets", participation_type);
  localStorage.setItem(key, JSON.stringify(presets));
}

function readActivePresetId(participation_type: AvParticipationType): string {
  const key = localStorageKeyWithVariant("avFilterSortActivePreset", participation_type);
  return localStorage.getItem(key) ?? DEFAULT_AV_PRESET_ID;
}

function writeActivePresetId(participation_type: AvParticipationType, id: string) {
  const key = localStorageKeyWithVariant("avFilterSortActivePreset", participation_type);
  localStorage.setItem(key, id);
}

export function useAvPresets(participation_type: AvParticipationType) {
  const [user_presets, set_user_presets] = useState<AvFilterSortPreset[]>(() =>
    readStoredPresets(participation_type),
  );

  const [active_preset_id, set_active_preset_id] = useState<string>(() =>
    readActivePresetId(participation_type),
  );

  const default_preset = defaultAvPresets[participation_type];
  const all_presets: AvFilterSortPreset[] = [default_preset, ...user_presets];
  const active_preset = all_presets.find((p) => p.id === active_preset_id) ?? default_preset;
  const is_default_active = active_preset.id === DEFAULT_AV_PRESET_ID;

  function selectPreset(id: string) {
    writeActivePresetId(participation_type, id);
    set_active_preset_id(id);
  }

  function createPreset(name: string) {
    const new_preset: AvFilterSortPreset = {
      id: crypto.randomUUID(),
      name,
      filter: active_preset.filter,
      sort_order: active_preset.sort_order,
    };
    const updated = [...user_presets, new_preset];
    writeStoredPresets(participation_type, updated);
    set_user_presets(updated);
    writeActivePresetId(participation_type, new_preset.id);
    set_active_preset_id(new_preset.id);
  }

  function renamePreset(id: string, name: string) {
    if (id === DEFAULT_AV_PRESET_ID) return;
    const updated = user_presets.map((p) => (p.id === id ? { ...p, name } : p));
    writeStoredPresets(participation_type, updated);
    set_user_presets(updated);
  }

  function deletePreset(id: string) {
    if (id === DEFAULT_AV_PRESET_ID) return;
    const updated = user_presets.filter((p) => p.id !== id);
    writeStoredPresets(participation_type, updated);
    set_user_presets(updated);
    if (active_preset_id === id) {
      writeActivePresetId(participation_type, DEFAULT_AV_PRESET_ID);
      set_active_preset_id(DEFAULT_AV_PRESET_ID);
    }
  }

  function updatePreset(filter: AvPublisherFilter, sort_order: PublisherSortOrder) {
    if (active_preset.id === DEFAULT_AV_PRESET_ID) return;
    const updated = user_presets.map((p) =>
      p.id === active_preset.id ? { ...p, filter, sort_order } : p,
    );
    writeStoredPresets(participation_type, updated);
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
