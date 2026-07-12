import { useLiveQuery } from "@tanstack/react-db";
import { weekendAssignmentCollection } from "@shared/database/collections/weekend-assignment";
import type { WeekendAssignment } from "@shared/database/schemas/weekend-assignment";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { computeWeekendStats } from "./computeWeekendStats";
import type { WeekendPublisherStats } from "../use-weekend-presets/types";

export type { WeekendPublisherStats };

export function useWeekendPublisherStats(
  stat_assignment_ids: string[],
  current_week_id: string,
): Map<string, WeekendPublisherStats> {
  const congregation_id = getStoredCongregation()?.id;
  const { data: allAssignments } = useLiveQuery((q) => q.from({ wa: weekendAssignmentCollection }));

  const filtered = ((allAssignments as WeekendAssignment[] | undefined) ?? []).filter(
    (a) => !congregation_id || a.congregation_id === congregation_id,
  );

  return computeWeekendStats(filtered, stat_assignment_ids, current_week_id);
}
