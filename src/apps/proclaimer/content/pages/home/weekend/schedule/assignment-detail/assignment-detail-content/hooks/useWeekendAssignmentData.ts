import { useLiveQuery } from "@tanstack/react-db";
import { weekendAssignmentCollection } from "@shared/database/collections/weekend-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { WeekendAssignment } from "@shared/database/schemas/weekend-assignment";
import { weekendAssignmentLabels } from "@shared/database/schemas/weekend-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";

interface UseWeekendAssignmentDataProps {
  week_id: string;
  assignment_id: string;
}

export function useWeekendAssignmentData({
  week_id,
  assignment_id,
}: UseWeekendAssignmentDataProps) {
  const congregation_id = getStoredCongregation()?.id;

  const { data: allAssignments, isLoading: isLoadingAssignments } = useLiveQuery((q) =>
    q.from({ wa: weekendAssignmentCollection }),
  );

  const { data: allPublishers, isLoading: isLoadingPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const assignment = (allAssignments as WeekendAssignment[] | undefined)?.find(
    (a) => a.week_id === week_id && a.assignment_id === assignment_id,
  );

  const publishers = ((allPublishers as Publisher[] | undefined) ?? []).filter(
    (p) => !congregation_id || p.congregation_id === congregation_id,
  );

  const assignee = publishers.find((p) => p.id === assignment?.participant_id);

  const assignmentTitle =
    weekendAssignmentLabels[assignment_id] ?? assignment_id.replace(/_/g, " ");

  const isLoading = isLoadingAssignments || isLoadingPublishers;

  return {
    congregation_id,
    assignment,
    publishers,
    assignee,
    assignmentTitle,
    isLoading,
  };
}
