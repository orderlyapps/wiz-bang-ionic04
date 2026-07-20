import { useLiveQuery } from "@tanstack/react-db";
import { IonList } from "@ionic/react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { WeekNavigation } from "@proclaimer-shared/components/navigation/week-navigation/WeekNavigation";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { midweekMeetingDataCollection } from "@shared/database/collections/midweek-meeting-data";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { MidweekMeetingData } from "@shared/database/schemas/midweek-meeting-data";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { ChairmanAssignmentCard } from "./components/chairman-assignment-card/ChairmanAssignmentCard";
import { getMeetingParts } from "@proclaimer-content/pages/home/clam-overseer/schedule/schedule-content/helper/get-meeting-parts";
import type { AssignmentRow } from "@proclaimer-content/pages/home/clam-overseer/schedule/schedule-content/helper/types";
import { useChairmanWeeks } from "../useChairmanWeeks";

const BASE_PATH = "/home/clam-overseer/schedule";

function ChairmanWeekSchedule({
  week_id,
  allMeetingData,
  allAssignments,
  publishers,
}: {
  week_id: string;
  allMeetingData: MidweekMeetingData[] | undefined;
  allAssignments: MidweekAssignment[] | undefined;
  publishers: Publisher[] | undefined;
}) {
  const weekData = allMeetingData?.find((m) => m.week_id === week_id);
  const assignments = allAssignments?.filter((a) => a.week_id === week_id);
  const show_school_2 = assignments?.some((a) => a.assignment_id === "chairman_2") ?? false;
  const meetingParts = weekData ? getMeetingParts(weekData, assignments, show_school_2) : [];
  const week_label = getTheocraticWeekLabel(week_id, {
    format: "week-range",
    useRelativeWeek: true,
    relativeWeekStyle: "append",
  });

  const rows: (AssignmentRow & {
    publisher_id?: string;
    publisher_first_name?: string;
  })[] = meetingParts.map((part) => {
    const assignment = assignments?.find((a) => a.assignment_id === part.assignmentId);
    const assignedPublisher = assignment
      ? publishers?.find((p) => p.id === assignment.participant_id)
      : undefined;
    const assignedName = assignedPublisher
      ? getPublisherDisplayName(assignedPublisher, "first_last")
      : undefined;
    const assistantAssignment = part.assistantId
      ? assignments?.find((a) => a.assignment_id === part.assistantId)
      : undefined;
    const assistantPublisher = assistantAssignment
      ? publishers?.find((p) => p.id === assistantAssignment.participant_id)
      : undefined;
    const assistantName = assistantPublisher
      ? getPublisherDisplayName(assistantPublisher, "first_last")
      : undefined;

    return {
      id: part.assignmentId,
      week_id,
      title: part.title,
      color: part.color,
      publisher: assignedName,
      assistant: assistantName,
      pin_to_first_column: part.pin_to_first_column,
      base_path: BASE_PATH,
      publisher_id: assignedPublisher?.id,
      publisher_first_name: assignedPublisher?.display_name || assignedPublisher?.first_name,
    };
  });

  return (
    <div>
      <Heading>{week_label}</Heading>
      <Space size="xs" />
      <IonList inset>
        <MultiColumnList<
          AssignmentRow & {
            publisher_id?: string;
            publisher_first_name?: string;
          }
        >
          items={rows}
          get_id={(row) => row.id}
          render_item={(row) => <ChairmanAssignmentCard {...row} />}
          pin_to_first_column={(row) => row.pin_to_first_column ?? false}
        />
      </IonList>
    </div>
  );
}

interface ClamChairmanContentProps {
  week_id: string;
}

export function ClamChairmanContent({ week_id }: ClamChairmanContentProps) {
  const permissions = usePermissions();
  const { chairman_week_ids } = useChairmanWeeks();
  const is_overseer = permissions.has_clam_overseer;

  const { data: allMeetingData } = useLiveQuery((q) =>
    q.from({ mmd: midweekMeetingDataCollection }),
  );
  const { data: allAssignments } = useLiveQuery((q) => q.from({ ma: midweekAssignmentCollection }));
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const is_loading =
    allMeetingData === undefined || allAssignments === undefined || publishers === undefined;

  if (is_loading) return <Spinner className="flex-center" />;

  if (is_overseer) {
    return (
      <>
        <WeekNavigation week_id={week_id} />
        <ChairmanWeekSchedule
          week_id={week_id}
          allMeetingData={allMeetingData as MidweekMeetingData[] | undefined}
          allAssignments={allAssignments as MidweekAssignment[] | undefined}
          publishers={publishers as Publisher[] | undefined}
        />
      </>
    );
  }

  return (
    <>
      {chairman_week_ids.map((w_id) => (
        <ChairmanWeekSchedule
          key={w_id}
          week_id={w_id}
          allMeetingData={allMeetingData as MidweekMeetingData[] | undefined}
          allAssignments={allAssignments as MidweekAssignment[] | undefined}
          publishers={publishers as Publisher[] | undefined}
        />
      ))}
    </>
  );
}
