import { IonList } from "@ionic/react";
import { Space } from "@ui/components/layout/space/Space";
import { ScheduleContent } from "@proclaimer-content/pages/home/clam-overseer/schedule/schedule-content/ScheduleContent";
import { MidweekAssignmentsDisplay } from "./components/midweek-assignments-display/MidweekAssignmentsDisplay";
import { MidweekAttendantsDisplay } from "./components/midweek-attendants-display/MidweekAttendantsDisplay";

interface MidweekMeetingContentProps {
  week_id: string;
}

export function MidweekMeetingContent({ week_id }: MidweekMeetingContentProps) {
  return (
    <>
      <ScheduleContent week_id={week_id} base_path="/schedules/midweek-meeting" />
      <IonList inset>
        <Space />
        <MidweekAssignmentsDisplay weekId={week_id} />
        <Space />
        <MidweekAttendantsDisplay weekId={week_id} />
      </IonList>
    </>
  );
}
