import { useState } from "react";
import { localStorageKeyWithVariant } from "@util/constants/localStorageKeys";
import type { ParticipationType } from "../../utils/participationTypeMap";
import type { PublisherSortOrder } from "./types";

export type { PublisherSortOrder } from "./types";
export { sortOrderLabels } from "./types";

function readStoredSortOrder(participation_type: ParticipationType | null): PublisherSortOrder {
  if (!participation_type) return "alphabetical";
  const key = localStorageKeyWithVariant("publisherSortOrder", participation_type);
  const stored = localStorage.getItem(key);
  if (
    stored === "alphabetical" ||
    stored === "weeks_away_closest" ||
    stored === "avg_weeks_between"
  ) {
    return stored;
  }
  return "alphabetical";
}

export function usePublisherSort(participation_type: ParticipationType | null) {
  const [sort_order, set_sort_order] = useState<PublisherSortOrder>(() =>
    readStoredSortOrder(participation_type),
  );

  function setSortOrder(order: PublisherSortOrder) {
    if (!participation_type) return;
    const key = localStorageKeyWithVariant("publisherSortOrder", participation_type);
    localStorage.setItem(key, order);
    set_sort_order(order);
  }

  return { sort_order, setSortOrder };
}
