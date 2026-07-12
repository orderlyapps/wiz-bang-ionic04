import { IonChip } from "@ionic/react";
import { Select } from "@ui/components/inputs/select/Select";
import { IncrementInput } from "@ui/components/inputs/increment-input/IncrementInput";
import { AlertMultiSelect } from "@ui/components/inputs/alert-multi-select/AlertMultiSelect";
import type { AvPublisherFilter } from "../../hooks/use-av-presets/types";
import type { AvParticipationType } from "../../utils/avParticipationTypeMap";

const genderOptions = [
  { label: "All", value: "all" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const avParticipationTypeOptions: { label: string; value: AvParticipationType }[] = [
  { label: "Video", value: "video" },
  { label: "Audio", value: "audio" },
  { label: "Platform", value: "platform" },
  { label: "Microphone", value: "microphone" },
  { label: "Entrance", value: "entrance" },
  { label: "Auditorium", value: "auditorium" },
  { label: "Zoom", value: "zoom" },
];

export interface AvFilterInputItem {
  id: string;
  node: React.ReactNode;
}

export function getAvFilterInputItems(
  filter: AvPublisherFilter,
  disabled: boolean,
  on_change: (filter: AvPublisherFilter) => void,
): AvFilterInputItem[] {
  return [
    {
      id: "gender",
      node: (
        <Select
          label="Gender"
          value={filter.gender}
          options={genderOptions}
          on_change={(value) =>
            on_change({ ...filter, gender: value as AvPublisherFilter["gender"] })
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
          label="Participant Assignment Types"
          options={avParticipationTypeOptions}
          selected={filter.participation_types}
          disabled={disabled}
          on_change={(values) =>
            on_change({ ...filter, participation_types: values as AvParticipationType[] })
          }
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
          label="Statistics Included Assignment Types"
          options={avParticipationTypeOptions}
          selected={filter.stat_participation_types}
          disabled={disabled}
          on_change={(values) =>
            on_change({ ...filter, stat_participation_types: values as AvParticipationType[] })
          }
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
