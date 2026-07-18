import { IonList } from "@ionic/react";
import { WeekNavigation } from "@proclaimer-shared/components/navigation/week-navigation/WeekNavigation";
import { WeekendAssignmentList } from "./components/weekend-assignment-list/WeekendAssignmentList";

type WeekendMeetingContentProps = {
  week_id: string;
};

export function WeekendMeetingContent({ week_id }: WeekendMeetingContentProps) {
  return (
    <IonList>
      <WeekNavigation week_id={week_id} />
      <WeekendAssignmentList week_id={week_id} />
    </IonList>
  );
}
