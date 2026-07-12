import { WeekNavigation } from "@proclaimer-shared/components/navigation/week-navigation/WeekNavigation";
import { IonList } from "@ionic/react";
// TODO: Create WeekEvents component or remove if not needed
// import { WeekEvents } from "@feature/db/shared/week-events/WeekEvents";
import { Space } from "@ui/components/layout/space/Space";
import { WeekendMeetingDisplay } from "./components/weekend-meeting-display/WeekendMeetingDisplay";
import { WeekendAssignmentsDisplay } from "./components/weekend-assignments-display/WeekendAssignmentsDisplay";
import { WeekendAttendantsDisplay } from "./components/weekend-attendants-display/WeekendAttendantsDisplay";
import { WeekendAssignmentsOtherDisplay } from "./components/weekend-assignments-other-display/WeekendAssignmentsOtherDisplay";
import { OutgoingSpeakersDisplay } from "./components/outgoing-speakers-display/OutgoingSpeakersDisplay";

type WeekendMeetingContentProps = {
  weekId: string;
};

export function WeekendMeetingContent({ weekId }: WeekendMeetingContentProps) {
  return (
    <>
      <WeekNavigation week_id={weekId} />
      <IonList className="ion-margin" inset>
        {/* <WeekEvents weekId={weekId} meetingType="weekend" /> */}
        <WeekendMeetingDisplay weekId={weekId} />
        <Space />
        <WeekendAssignmentsOtherDisplay weekId={weekId} />
        <Space />
        <WeekendAssignmentsDisplay weekId={weekId} />
        <Space />
        <WeekendAttendantsDisplay weekId={weekId} />
        <Space />
        <OutgoingSpeakersDisplay weekId={weekId} />
      </IonList>
    </>
  );
}
