import { useLiveQuery } from "@tanstack/react-db";
import { WeekNavigation } from "@proclaimer-shared/components/navigation/week-navigation/WeekNavigation";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { IonList } from "@ionic/react";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { midweekMeetingDataCollection } from "@shared/database/collections/midweek-meeting-data";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { MidweekMeetingData } from "@shared/database/schemas/midweek-meeting-data";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import { AssignmentCard } from "./components/assignment-card/AssignmentCard";
import { getMeetingParts } from "./helper/get-meeting-parts";
import { useAssignmentRows } from "./helper/use-assignment-rows";
import type { ScheduleContentProps, AssignmentRow } from "./helper/types";
import { Space } from "@ui/components/layout/space/Space";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { Spinner } from "@ui/components/display/spinner/Spinner";

export function ScheduleContent({ week_id, base_path }: ScheduleContentProps) {
  const permissions = usePermissions();
  const can_edit = permissions.has_clam_overseer;

  const { data: allMeetingData } = useLiveQuery((q) =>
    q.from({ mmd: midweekMeetingDataCollection }),
  );

  const { data: allAssignments } = useLiveQuery((q) => q.from({ ma: midweekAssignmentCollection }));

  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const meetingData = (allMeetingData as MidweekMeetingData[] | undefined)?.filter(
    (m) => m.week_id === week_id,
  );
  const weekData = meetingData?.[0];
  const assignments = (allAssignments as MidweekAssignment[] | undefined)?.filter(
    (a) => a.week_id === week_id,
  );

  const show_school_2 = assignments?.some((a) => a.assignment_id === "chairman_2") ?? false;

  const meetingParts = weekData ? getMeetingParts(weekData, assignments, show_school_2) : [];

  const rows = useAssignmentRows(
    meetingParts,
    assignments,
    publishers as Publisher[] | undefined,
    week_id,
    base_path,
  );

  const is_loading =
    allMeetingData === undefined || allAssignments === undefined || publishers === undefined;

  if (is_loading) return <Spinner className="flex-center" />;

  return (
    <>
      <WeekNavigation week_id={week_id} />
      <IonList inset>
        <MultiColumnList<AssignmentRow>
          items={rows}
          get_id={(row) => row.id}
          render_item={(row) => <AssignmentCard {...row} />}
          pin_to_first_column={(row) => row.pin_to_first_column ?? false}
        />
        {!show_school_2 && can_edit && (
          <>
            <Space />
            <TextButton
              label="Add Second School"
              routerLink={`${base_path}/${week_id}/assignment/chairman_2`}
            />
          </>
        )}
      </IonList>
    </>
  );
}
