import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Select } from "@ui/components/inputs/select/Select";
import { Space } from "@ui/components/layout/space/Space";
import { IncrementInput } from "@ui/components/inputs/increment-input/IncrementInput";
import { AlertMultiSelect } from "@ui/components/inputs/alert-multi-select/AlertMultiSelect";
import {
  weekendAssignmentIDs,
  weekendAssignmentLabels,
} from "@shared/database/schemas/weekend-assignment";
import type {
  WeekendFilterSortPreset,
  WeekendPublisherFilter,
  PublisherSortOrder,
} from "../../hooks/use-weekend-presets/types";
import { sortOrderLabels } from "../../hooks/use-weekend-presets/types";
import { PresetManager } from "@proclaimer-shared/components/preset-manager/PresetManager";
import { DEFAULT_WEEKEND_PRESET_ID } from "../../hooks/use-weekend-presets/defaultWeekendPreset";

const weekendAssignmentOptions = weekendAssignmentIDs.map((id) => ({
  label: weekendAssignmentLabels[id],
  value: id,
}));

interface WeekendFilterSelectModalProps {
  is_open: boolean;
  presets: WeekendFilterSortPreset[];
  active_preset: WeekendFilterSortPreset;
  is_default_active: boolean;
  on_select_preset: (id: string) => void;
  on_create_preset: (name: string) => void;
  on_rename_preset: (id: string, name: string) => void;
  on_delete_preset: (id: string) => void;
  on_change: (filter: WeekendPublisherFilter, sort_order: PublisherSortOrder) => void;
  on_dismiss: () => void;
}

export function WeekendFilterSelectModal({
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
}: WeekendFilterSelectModalProps) {
  const sort_options: PublisherSortOrder[] = [
    "alphabetical",
    "weeks_away_closest",
    "avg_weeks_between",
  ];

  const filter_items = [
    {
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
    },
    {
      id: "min_weeks_away",
      node: (
        <IncrementInput
          label="Minimum Weeks From Closest Assignment"
          value={active_preset.filter.min_weeks_away_closest}
          min={0}
          disabled={is_default_active}
          on_change={(value) =>
            on_change(
              { ...active_preset.filter, min_weeks_away_closest: value },
              active_preset.sort_order,
            )
          }
        />
      ),
    },
    {
      id: "min_avg_weeks",
      node: (
        <IncrementInput
          label="Average Weeks Between Assignments"
          value={active_preset.filter.min_avg_weeks_between}
          min={0}
          disabled={is_default_active}
          on_change={(value) =>
            on_change(
              { ...active_preset.filter, min_avg_weeks_between: value },
              active_preset.sort_order,
            )
          }
        />
      ),
    },
    {
      id: "participation_types",
      node: (
        <AlertMultiSelect
          label="Participant Assignment Types"
          options={weekendAssignmentOptions}
          selected={active_preset.filter.participation_types}
          disabled={is_default_active}
          on_change={(values) =>
            on_change(
              { ...active_preset.filter, participation_types: values as string[] },
              active_preset.sort_order,
            )
          }
        />
      ),
    },
    {
      id: "stat_participation_types",
      node: (
        <AlertMultiSelect
          label="Statistics Included Assignment Types"
          options={weekendAssignmentOptions}
          selected={active_preset.filter.stat_participation_types}
          disabled={is_default_active}
          on_change={(values) =>
            on_change(
              { ...active_preset.filter, stat_participation_types: values as string[] },
              active_preset.sort_order,
            )
          }
        />
      ),
    },
  ];

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
          default_preset_ids={new Set([DEFAULT_WEEKEND_PRESET_ID])}
          on_select={on_select_preset}
          on_create={on_create_preset}
          on_rename={on_rename_preset}
          on_delete={on_delete_preset}
        />
        <Space size="xl" />
        <MultiColumnList
          items={filter_items}
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
