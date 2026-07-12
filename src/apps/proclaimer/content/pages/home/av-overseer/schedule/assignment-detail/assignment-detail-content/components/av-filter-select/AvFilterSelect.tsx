import { useState } from "react";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { AvFilterSelectModal } from "./AvFilterSelectModal";
import type {
  AvFilterSortPreset,
  AvPublisherFilter,
  PublisherSortOrder,
} from "../../hooks/use-av-presets/types";

interface AvFilterSelectProps {
  presets: AvFilterSortPreset[];
  active_preset: AvFilterSortPreset;
  is_default_active: boolean;
  on_select_preset: (id: string) => void;
  on_create_preset: (name: string) => void;
  on_rename_preset: (id: string, name: string) => void;
  on_delete_preset: (id: string) => void;
  on_change: (filter: AvPublisherFilter, sort_order: PublisherSortOrder) => void;
}

export function AvFilterSelect({
  presets,
  active_preset,
  is_default_active,
  on_select_preset,
  on_create_preset,
  on_rename_preset,
  on_delete_preset,
  on_change,
}: AvFilterSelectProps) {
  const [is_open, set_is_open] = useState(false);

  return (
    <>
      <ModalSelect
        label="Filter & Sort"
        display_value={active_preset.name}
        placeholder="Filter & Sort..."
        on_open={() => set_is_open(true)}
      />
      <AvFilterSelectModal
        is_open={is_open}
        presets={presets}
        active_preset={active_preset}
        is_default_active={is_default_active}
        on_select_preset={on_select_preset}
        on_create_preset={on_create_preset}
        on_rename_preset={on_rename_preset}
        on_delete_preset={on_delete_preset}
        on_change={on_change}
        on_dismiss={() => set_is_open(false)}
      />
    </>
  );
}
