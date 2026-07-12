import { useLiveQuery } from "@tanstack/react-db";
import { avAssignmentCollection } from "@shared/database/collections/av-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { AvAssignment } from "@shared/database/schemas/av-assignment";
import { avAssignmentLabels } from "@shared/database/schemas/av-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";

interface UseAvAssignmentDataProps {
  week_id: string;
  assignment_id: string;
}

export function useAvAssignmentData({ week_id, assignment_id }: UseAvAssignmentDataProps) {
  const congregation_id = getStoredCongregation()?.id;

  const { data: allAssignments, isLoading: isLoadingAssignments } = useLiveQuery((q) =>
    q.from({ aa: avAssignmentCollection }),
  );

  const { data: allPublishers, isLoading: isLoadingPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const assignment = (allAssignments as AvAssignment[] | undefined)?.find(
    (a) => a.week_id === week_id && a.assignment_id === assignment_id,
  );

  const publishers = ((allPublishers as Publisher[] | undefined) ?? []).filter(
    (p) => !congregation_id || p.congregation_id === congregation_id,
  );

  const assignee = publishers.find((p) => p.id === assignment?.participant_id);

  const assignmentTitle = avAssignmentLabels[assignment_id] ?? assignment_id.replace(/_/g, " ");

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
