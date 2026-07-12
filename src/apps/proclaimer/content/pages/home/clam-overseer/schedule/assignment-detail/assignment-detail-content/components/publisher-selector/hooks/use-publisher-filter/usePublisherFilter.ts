import { useState } from "react";
import { localStorageKeyWithVariant } from "@util/constants/localStorageKeys";
import type { ParticipationType } from "../../utils/participationTypeMap";

export type GenderFilter = "all" | "male" | "female";

export interface PublisherFilter {
  gender: GenderFilter;
  min_weeks_away_closest: number;
  min_avg_weeks_between: number;
  participation_types: ParticipationType[];
  stat_participation_types: ParticipationType[];
}

export const filterLabels: Record<GenderFilter, string> = {
  all: "All",
  male: "Male",
  female: "Female",
};

const default_filter: PublisherFilter = {
  gender: "all",
  min_weeks_away_closest: 0,
  min_avg_weeks_between: 0,
  participation_types: [],
  stat_participation_types: [],
};

function readStoredFilter(participation_type: ParticipationType | null): PublisherFilter {
  if (!participation_type) return default_filter;
  const key = localStorageKeyWithVariant("publisherGenderFilter", participation_type);
  const stored = localStorage.getItem(key);
  if (!stored) return default_filter;
  try {
    const parsed = JSON.parse(stored) as Partial<PublisherFilter>;
    return {
      gender: parsed.gender ?? "all",
      min_weeks_away_closest: parsed.min_weeks_away_closest ?? 0,
      min_avg_weeks_between: parsed.min_avg_weeks_between ?? 0,
      participation_types: parsed.participation_types ?? [],
      stat_participation_types: parsed.stat_participation_types ?? [],
    };
  } catch {
    return default_filter;
  }
}

export function usePublisherFilter(participation_type: ParticipationType | null) {
  const [filter, set_filter] = useState<PublisherFilter>(() =>
    readStoredFilter(participation_type),
  );

  function setFilter(newFilter: PublisherFilter) {
    if (!participation_type) return;
    const key = localStorageKeyWithVariant("publisherGenderFilter", participation_type);
    localStorage.setItem(key, JSON.stringify(newFilter));
    set_filter(newFilter);
  }

  return { filter, setFilter };
}
