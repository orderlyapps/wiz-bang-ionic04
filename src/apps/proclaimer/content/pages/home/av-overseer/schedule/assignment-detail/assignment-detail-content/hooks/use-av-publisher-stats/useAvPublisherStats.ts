import { useLiveQuery } from "@tanstack/react-db";
import { avAssignmentCollection } from "@shared/database/collections/av-assignment";
import type { AvAssignment } from "@shared/database/schemas/av-assignment";
import type { AvParticipationType } from "../../utils/avParticipationTypeMap";
import { computeAvStats } from "./computeAvStats";

export type { AvPublisherStats } from "./computeAvStats";

export function useAvPublisherStats(
  participation_type: AvParticipationType,
  current_week_id: string,
  congregation_id: string | undefined,
  stat_participation_types: AvParticipationType[] = [],
): Map<string, import("./computeAvStats").AvPublisherStats> {
  const { data: allAssignments } = useLiveQuery((q) => q.from({ aa: avAssignmentCollection }));

  const filtered = ((allAssignments as AvAssignment[] | undefined) ?? []).filter(
    (a) => !congregation_id || a.congregation_id === congregation_id,
  );

  return computeAvStats(filtered, participation_type, current_week_id, stat_participation_types);
}
