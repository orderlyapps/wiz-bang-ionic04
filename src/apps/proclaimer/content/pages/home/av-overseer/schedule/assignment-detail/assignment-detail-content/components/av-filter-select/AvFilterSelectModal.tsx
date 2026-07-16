import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Select } from "@ui/components/inputs/select/Select";
import { Space } from "@ui/components/layout/space/Space";
import { sortOrderLabels } from "@proclaimer-content/pages/home/clam-overseer/schedule/assignment-detail/assignment-detail-content/components/publisher-selector/hooks/use-publisher-sort/types";
import type { AvFilterSortPreset, AvPublisherFilter } from "../../hooks/use-av-presets/types";
import type { PublisherSortOrder } from "../../hooks/use-av-presets/types";
import { getAvFilterInputItems } from "./AvFilterSection";
import { PresetManager } from "@proclaimer-shared/components/preset-manager/PresetManager";
import { DEFAULT_AV_PRESET_ID } from "../../hooks/use-av-presets/defaultAvPresets";

const sort_options: PublisherSortOrder[] = [
  "alphabetical",
  "weeks_away_closest",
  "avg_weeks_between",
];

interface AvFilterSelectModalProps {
  is_open: boolean;
  presets: AvFilterSortPreset[];
  active_preset: AvFilterSortPreset;
  is_default_active: boolean;
  on_select_preset: (id: string) => void;
  on_create_preset: (name: string) => void;
  on_rename_preset: (id: string, name: string) => void;
  on_delete_preset: (id: string) => void;
  on_change: (filter: AvPublisherFilter, sort_order: PublisherSortOrder) => void;
  on_dismiss: () => void;
}

export function AvFilterSelectModal({
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
}: AvFilterSelectModalProps) {
  const sort_item = {
    id: "sort",
    node: (
      <Select
        label="Sort"
        value={active_preset.sort_order}
        options={sort_options.map((o) => ({ value: o, label: sortOrderLabels[o] }))}
        disabled={is_default_active}
        on_change={(v) => on_change(active_preset.filter, v as PublisherSortOrder)}
      />
    ),
  };

  const filter_items = getAvFilterInputItems(active_preset.filter, is_default_active, (filter) =>
    on_change(filter, active_preset.sort_order),
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
          default_preset_ids={new Set([DEFAULT_AV_PRESET_ID])}
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
