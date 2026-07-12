import type { ReactNode } from "react";
import type { PublisherSortOrder } from "../../../../../../hooks/use-presets/usePresets";
import { sortOrderLabels } from "../../../../../../hooks/use-publisher-sort/types";
import { Select } from "@ui/components/inputs/select/Select";

const sort_options: PublisherSortOrder[] = [
  "alphabetical",
  "weeks_away_closest",
  "avg_weeks_between",
];

export interface SortInputItem {
  id: string;
  node: ReactNode;
}

export function getSortInputItem(
  sort_order: PublisherSortOrder,
  disabled: boolean,
  on_change: (order: PublisherSortOrder) => void,
): SortInputItem {
  return {
    id: "sort",
    node: (
      <Select
        label="Sort"
        value={sort_order}
        options={sort_options.map((o) => ({ value: o, label: sortOrderLabels[o] }))}
        disabled={disabled}
        on_change={(v) => on_change(v as PublisherSortOrder)}
      />
    ),
  };
}
