import type React from "react";
import { IonChip } from "@ionic/react";
import { Select } from "@ui/components/inputs/select/Select";
import { AlertMultiSelect } from "@ui/components/inputs/alert-multi-select/AlertMultiSelect";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { PublisherFilter } from "../../../../hooks/use-publisher-filter/types";
import { archivedOptions, filterLabels } from "../../../../hooks/use-publisher-filter/types";

export const genderOptions = [
  { label: filterLabels.all, value: "all" },
  { label: filterLabels.male, value: "male" },
  { label: filterLabels.female, value: "female" },
];

export const standingOptions = [
  { label: "Elder", value: "elder" },
  { label: "Ministerial Servant", value: "ministerial_servant" },
  { label: "Publisher", value: "publisher" },
  { label: "Unbaptised Publisher", value: "unbaptised_publisher" },
  { label: "Associate", value: "associate" },
];

export const typeOptions = [
  { label: "Publisher", value: "publisher" },
  { label: "Continuous Auxiliary", value: "continuous_auxiliary" },
  { label: "Regular Pioneer", value: "regular_pioneer" },
  { label: "Special Pioneer", value: "special_pioneer" },
  { label: "Inactive", value: "inactive" },
  { label: "Associate", value: "associate" },
  { label: "Speaker", value: "speaker" },
  { label: "Circuit Overseer", value: "circuit_overseer" },
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
      id: "standing",
      node: (
        <AlertMultiSelect
          label="Standing"
          options={standingOptions}
          selected={filter.standing === "all" ? [] : filter.standing}
          disabled={disabled}
          on_change={(values) =>
            on_change({
              ...filter,
              standing: values.length === 0 ? "all" : (values as Publisher["standing"][]),
            })
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
              {filter.standing === "all" ? (
                <IonChip key="all">All</IonChip>
              ) : (
                opts
                  .filter((o) => sel.includes(o.value))
                  .map((o) => <IonChip key={o.value}>{o.label}</IonChip>)
              )}
            </div>
          )}
        />
      ),
    },
    {
      id: "type",
      node: (
        <AlertMultiSelect
          label="Service Type"
          options={typeOptions}
          selected={filter.type === "all" ? [] : filter.type}
          disabled={disabled}
          on_change={(values) =>
            on_change({
              ...filter,
              type: values.length === 0 ? "all" : (values as Publisher["type"][]),
            })
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
              {filter.type === "all" ? (
                <IonChip key="all">All</IonChip>
              ) : (
                opts
                  .filter((o) => sel.includes(o.value))
                  .map((o) => <IonChip key={o.value}>{o.label}</IonChip>)
              )}
            </div>
          )}
        />
      ),
    },
    {
      id: "archived",
      node: (
        <Select
          label="Archived"
          value={filter.archived}
          options={[...archivedOptions]}
          on_change={(value) =>
            on_change({ ...filter, archived: value as PublisherFilter["archived"] })
          }
          disabled={disabled}
        />
      ),
    },
  ];
}
