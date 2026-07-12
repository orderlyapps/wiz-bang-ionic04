import { IonChip } from "@ionic/react";
import { Select } from "@ui/components/inputs/select/Select";
import { IncrementInput } from "@ui/components/inputs/increment-input/IncrementInput";
import { AlertMultiSelect } from "@ui/components/inputs/alert-multi-select/AlertMultiSelect";
import type { PublisherFilter } from "../../../../../../hooks/use-presets/usePresets";
import { filterLabels } from "../../../../../../hooks/use-publisher-filter/usePublisherFilter";
import type { ParticipationType } from "../../../../../../utils/participationTypeMap";

export const genderOptions = [
  { label: filterLabels.all, value: "all" },
  { label: filterLabels.male, value: "male" },
  { label: filterLabels.female, value: "female" },
];

export const participationTypeOptions: { label: string; value: ParticipationType }[] = [
  { label: "Prayer", value: "prayer" },
  { label: "Treasures", value: "treasures" },
  { label: "Gems", value: "gems" },
  { label: "Bible Reading", value: "bible_reading" },
  { label: "Apply", value: "apply" },
  { label: "Assistant", value: "assistant" },
  { label: "Chairman", value: "chairman" },
  { label: "Counselor", value: "counselor" },
  { label: "Living", value: "living" },
  { label: "CBS Conductor", value: "cbs_conductor" },
  { label: "CBS Reader", value: "cbs_reader" },
];

export interface FilterInputItem {
  id: string;
  node: React.ReactNode;
}

export function getFilterInputItems(
  filter: PublisherFilter,
  disabled: boolean,
  on_change: (filter: PublisherFilter) => void,
): FilterInputItem[] {
  return [
    {
      id: "gender",
      node: (
        <Select
          label="Gender"
          value={filter.gender}
          options={genderOptions}
          on_change={(value) =>
            on_change({ ...filter, gender: value as PublisherFilter["gender"] })
          }
          disabled={disabled}
        />
      ),
    },
    {
      id: "min_weeks_away",
      node: (
        <IncrementInput
          label="Minimum Weeks From Closest Assignment"
          value={filter.min_weeks_away_closest}
          min={0}
          on_change={(value) => on_change({ ...filter, min_weeks_away_closest: value })}
          disabled={disabled}
        />
      ),
    },
    {
      id: "min_avg_weeks",
      node: (
        <IncrementInput
          label="Average Weeks Between Assignments"
          value={filter.min_avg_weeks_between}
          min={0}
          on_change={(value) => on_change({ ...filter, min_avg_weeks_between: value })}
          disabled={disabled}
        />
      ),
    },
    {
      id: "participation_types",
      node: (
        <AlertMultiSelect
          label="Participants Assignment Types"
          options={participationTypeOptions}
          selected={filter.participation_types}
          disabled={disabled}
          on_change={(values) => on_change({ ...filter, participation_types: values })}
          render_selected={(sel, opts) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                gap: "4px",
              }}
            >
              {opts
                .filter((o) => sel.includes(o.value))
                .map((o) => (
                  <IonChip key={o.value}>{o.label}</IonChip>
                ))}
            </div>
          )}
        />
      ),
    },
    {
      id: "stat_participation_types",
      node: (
        <AlertMultiSelect
          label="Statistics Included Assignment Type"
          options={participationTypeOptions}
          selected={filter.stat_participation_types}
          disabled={disabled}
          on_change={(values) => on_change({ ...filter, stat_participation_types: values })}
          render_selected={(sel, opts) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                gap: "4px",
              }}
            >
              {opts
                .filter((o) => sel.includes(o.value))
                .map((o) => (
                  <IonChip key={o.value}>{o.label}</IonChip>
                ))}
            </div>
          )}
        />
      ),
    },
  ];
}
