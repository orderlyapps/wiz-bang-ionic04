import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Select } from "@ui/components/inputs/select/Select";
import { Space } from "@ui/components/layout/space/Space";
import { mapTagCollection } from "@shared/database/collections/map-tag";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MapTagRow } from "@shared/database/schemas/map-tag";
import { PresetManager } from "@proclaimer-shared/components/preset-manager/PresetManager";
import { DEFAULT_PRESET_IDS } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/use-map-log-presets/defaultMapLogPresets";
import { getMapLogFilterInputItems } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/map-log-filter-modal/components/filter-section/MapLogFilterSection";
import { sortOrderLabels } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/use-map-log-presets/types";
import type {
  MapLogFilterSortPreset,
  MapLogFilters,
  MapLogSortOrder,
} from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/use-map-log-presets/types";

interface MapListFilterModalProps {
  is_open: boolean;
  presets: MapLogFilterSortPreset[];
  active_preset: MapLogFilterSortPreset;
  is_default_active: boolean;
  on_select_preset: (id: string) => void;
  on_create_preset: (name: string) => void;
  on_rename_preset: (id: string, name: string) => void;
  on_delete_preset: (id: string) => void;
  on_change: (filter: MapLogFilters, sort_order: MapLogSortOrder) => void;
  on_dismiss: () => void;
}

export function MapListFilterModal({
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
}: MapListFilterModalProps) {
  const { data: tags_data } = useLiveQuery((q) =>
    q.from({ t: mapTagCollection }).orderBy(({ t }) => t.name),
  );
  const congregation = useStoredCongregation();

  const all_tags = (tags_data as MapTagRow[] | undefined) ?? [];
  const congregation_tags = all_tags.filter((t) => t.congregation_id === congregation?.id);
  const tag_options = congregation_tags.map((t) => ({ label: t.name, value: t.id ?? "" }));

  const sort_options = (Object.keys(sortOrderLabels) as MapLogSortOrder[]).map((o) => ({
    value: o,
    label: sortOrderLabels[o],
  }));

  const sort_item = {
    id: "sort",
    node: (
      <Select
        label="Sort"
        value={active_preset.sort_order}
        options={sort_options}
        disabled={is_default_active}
        on_change={(v) => on_change(active_preset.filter, v as MapLogSortOrder)}
      />
    ),
  };

  const filter_items = getMapLogFilterInputItems(
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
          default_preset_ids={DEFAULT_PRESET_IDS}
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
