import { useLiveQuery } from "@tanstack/react-db";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import { midweekMeetingDataCollection } from "@shared/database/collections/midweek-meeting-data";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { MidweekMeetingData } from "@shared/database/schemas/midweek-meeting-data";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getMeetingParts } from "@proclaimer-content/pages/home/clam-overseer/schedule/schedule-content/helper/get-meeting-parts";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { getAssignmentContext } from "../utils/get-assignment-context";

interface UseAssignmentDataProps {
  week_id: string;
  assignment_id: string;
}

export function useAssignmentData({ week_id, assignment_id }: UseAssignmentDataProps) {
  const congregation_id = getStoredCongregation()?.id;

  const { data: allAssignments, isLoading: isLoadingAssignments } = useLiveQuery((q) =>
    q.from({ ma: midweekAssignmentCollection }),
  );

  const { data: allMeetingData, isLoading: isLoadingMeetingData } = useLiveQuery((q) =>
    q.from({ mmd: midweekMeetingDataCollection }),
  );

  const { data: allPublishers, isLoading: isLoadingPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const assignment = (allAssignments as MidweekAssignment[] | undefined)?.find(
    (a) => a.week_id === week_id && a.assignment_id === assignment_id,
  );

  const weekData = (allMeetingData as MidweekMeetingData[] | undefined)?.find(
    (m) => m.week_id === week_id,
  );

  const show_school_2 =
    (allAssignments as MidweekAssignment[] | undefined)?.some(
      (a) => a.week_id === week_id && a.assignment_id === "chairman_2",
    ) ?? false;

  const matchedPart = weekData
    ? getMeetingParts(
        weekData,
        allAssignments as MidweekAssignment[] | undefined,
        show_school_2,
      ).find((p) => p.assignmentId === assignment_id)
    : undefined;

  const publishers = ((allPublishers as Publisher[] | undefined) ?? []).filter(
    (p) => p.congregation_id === congregation_id,
  );

  const assignee = publishers.find((p) => p.id === assignment?.participant_id);

  const assigneeLabel = (() => {
    if (/^school_\d_(bible_reading|apply_\d)$/.test(assignment_id)) return "Student";
    if (assignment_id === "cbs_reader") return "Reader";
    if (assignment_id === "cbs_conductor") return "Conductor";
    return "Participant";
  })();

  const assistantId = matchedPart?.assistantId;
  const assistantAssignment = assistantId
    ? (allAssignments as MidweekAssignment[] | undefined)?.find(
        (a) => a.week_id === week_id && a.assignment_id === assistantId,
      )
    : undefined;
  const assistantAssignee = publishers.find((p) => p.id === assistantAssignment?.participant_id);

  const isLoading = isLoadingAssignments || isLoadingPublishers || isLoadingMeetingData;

  return {
    congregation_id,
    assignment,
    weekData,
    publishers,
    matchedPart,
    assignee,
    assigneeLabel,
    assistantId,
    assistantAssignment,
    assistantAssignee,
    isLoading,
    assignmentTitle: matchedPart?.title ?? assignment_id.replace(/_/g, " "),
    assignmentColor: matchedPart?.color ?? "medium",
    assignmentContext: weekData ? getAssignmentContext(assignment_id, weekData) : undefined,
  };
}
