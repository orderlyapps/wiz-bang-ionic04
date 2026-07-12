import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Select } from "@ui/components/inputs/select/Select";
import { ToggleInput } from "@ui/components/inputs/toggle/ToggleInput";
import { AlertMultiSelect } from "@ui/components/inputs/alert-multi-select/AlertMultiSelect";
import { Space } from "@ui/components/layout/space/Space";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { mapTagCollection } from "@shared/database/collections/map-tag";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { PresetManager } from "@proclaimer-shared/components/preset-manager/PresetManager";
import { MINISTRY_DEFAULT_PRESET_IDS } from "../../hooks/defaultMinistryMapPresets";
import { ministrySortOrderLabels } from "../../hooks/types";
import type { MapTagRow } from "@shared/database/schemas/map-tag";
import type {
  MinistryMapFilterSortPreset,
  MinistryMapFilters,
  MinistryMapSortOrder,
} from "../../hooks/types";

interface MapFilterModalProps {
  is_open: boolean;
  presets: MinistryMapFilterSortPreset[];
  active_preset: MinistryMapFilterSortPreset;
  is_default_active: boolean;
  on_select_preset: (id: string) => void;
  on_create_preset: (name: string) => void;
  on_rename_preset: (id: string, name: string) => void;
  on_delete_preset: (id: string) => void;
  on_change: (filter: MinistryMapFilters, sort_order: MinistryMapSortOrder) => void;
  on_dismiss: () => void;
}

type FilterItem = { id: string; node: React.ReactNode };

function getFilterInputItems(
  filter: MinistryMapFilters,
  disabled: boolean,
  tag_options: { label: string; value: string }[],
  on_change: (filter: MinistryMapFilters) => void,
): FilterItem[] {
  const items: FilterItem[] = [
    {
      id: "checked_out_only",
      node: (
        <ToggleInput
          label="Checked Out Only"
          checked={filter.checked_out_only}
          disabled={disabled}
          on_change={(checked) => on_change({ ...filter, checked_out_only: checked })}
        />
      ),
    },
    {
      id: "untagged_only",
      node: (
        <ToggleInput
          label="Untagged Only"
          checked={filter.untagged_only}
          disabled={disabled}
          on_change={(checked) =>
            on_change({
              ...filter,
              untagged_only: checked,
              tag_ids: checked ? [] : filter.tag_ids,
            })
          }
        />
      ),
    },
  ];

  if (!filter.untagged_only) {
    items.push({
      id: "tag_ids",
      node: (
        <AlertMultiSelect
          label="Tags"
          options={tag_options}
          selected={filter.tag_ids}
          placeholder="Filter by tag..."
          disabled={disabled}
          on_change={(tag_ids) => on_change({ ...filter, tag_ids })}
        />
      ),
    });
  }

  return items;
}

export function MapFilterModal({
  is_open,
  presets,
  active_preset,
  is_default_active,
  on_select_preset,
  on_create_preset,
  on_rename_preset,
  on_delete_preset,
  on_change,
  on_dismiss,
}: MapFilterModalProps) {
  const { data: tags_data } = useLiveQuery((q) =>
    q.from({ t: mapTagCollection }).orderBy(({ t }) => t.name),
  );
  const congregation = useStoredCongregation();

  const all_tags = (tags_data as MapTagRow[] | undefined) ?? [];
  const congregation_tags = all_tags.filter((t) => t.congregation_id === congregation?.id);
  const tag_options = congregation_tags.map((t) => ({ label: t.name, value: t.id ?? "" }));

  const sort_options = (Object.keys(ministrySortOrderLabels) as MinistryMapSortOrder[]).map(
    (o) => ({
      value: o,
      label: ministrySortOrderLabels[o],
    }),
  );

  const sort_item = {
    id: "sort",
    node: (
      <Select
        label="Sort"
        value={active_preset.sort_order}
        options={sort_options}
        disabled={is_default_active}
        on_change={(v) => on_change(active_preset.filter, v as MinistryMapSortOrder)}
      />
    ),
  };

  const filter_items = getFilterInputItems(
    active_preset.filter,
    is_default_active,
    tag_options,
    (filter) => on_change(filter, active_preset.sort_order),
  );

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter &amp; Sort</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PresetManager
          presets={presets}
          active_preset_id={active_preset.id}
          is_default_active={is_default_active}
          default_preset_ids={MINISTRY_DEFAULT_PRESET_IDS}
          on_select={on_select_preset}
          on_create={on_create_preset}
          on_rename={on_rename_preset}
          on_delete={on_delete_preset}
        />
        <Space size="xl" />
        <MultiColumnList
          items={[sort_item, ...filter_items]}
          get_id={(item) => item.id}
          render_item={(item) => item.node}
          gap="md"
          max_columns={2}
          row_gap="lg"
        />
      </IonContent>
    </ResponsiveModal>
  );
}
