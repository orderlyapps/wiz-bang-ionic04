import { FilterSelect } from "../filter-select/FilterSelect";
import type {
  FilterSortPreset,
  PublisherFilter,
  PublisherSortOrder,
} from "../../hooks/use-presets/usePresets";

interface PublisherControlsProps {
  presets: FilterSortPreset[];
  active_preset: FilterSortPreset;
  is_default_active: boolean;
  on_select_preset: (id: string) => void;
  on_create_preset: (name: string) => void;
  on_rename_preset: (id: string, name: string) => void;
  on_delete_preset: (id: string) => void;
  on_change: (filter: PublisherFilter, sort_order: PublisherSortOrder) => void;
}

export function PublisherControls({
  presets,
  active_preset,
  is_default_active,
  on_select_preset,
  on_create_preset,
  on_rename_preset,
  on_delete_preset,
  on_change,
}: PublisherControlsProps) {
  return (
    <FilterSelect
      presets={presets}
      active_preset={active_preset}
      is_default_active={is_default_active}
      on_select_preset={on_select_preset}
      on_create_preset={on_create_preset}
      on_rename_preset={on_rename_preset}
      on_delete_preset={on_delete_preset}
      on_change={on_change}
    />
  );
}
