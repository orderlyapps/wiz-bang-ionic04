import { IonButtons, IonContent, IonHeader, IonItem, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import type { FilterSortPreset } from "../../hooks/use-presets/types";
import type { PublisherFilter } from "../../hooks/use-publisher-filter/types";
import { PresetManager } from "@proclaimer-shared/components/preset-manager/PresetManager";
import { DEFAULT_PRESET_ID } from "../../hooks/use-presets/defaultPresets";
import { getFilterInputItems } from "./components/filter-section/FilterSection";
import { Space } from "@ui/components/layout/space/Space";
import { Body } from "@ui/components/display/text/body/Body";

interface FilterSelectModalProps {
  is_open: boolean;
  presets: FilterSortPreset[];
  active_preset: FilterSortPreset;
  is_default_active: boolean;
  on_select_preset: (id: string) => void;
  on_create_preset: (name: string) => void;
  on_rename_preset: (id: string, name: string) => void;
  on_delete_preset: (id: string) => void;
  on_change: (filter: PublisherFilter) => void;
  on_dismiss: () => void;
}

export function FilterSelectModal({
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
}: FilterSelectModalProps) {
  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter</IonTitle>
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
          default_preset_ids={new Set([DEFAULT_PRESET_ID])}
          show_note={false}
          on_select={on_select_preset}
          on_create={on_create_preset}
          on_rename={on_rename_preset}
          on_delete={on_delete_preset}
        />
        <Space size="xl" />
        {is_default_active && (
          <IonItem lines="none">
            <Body color="medium">Create a custom preset to enable filter editing</Body>
          </IonItem>
        )}
        <MultiColumnList
          items={getFilterInputItems(active_preset.filter, is_default_active, on_change)}
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
