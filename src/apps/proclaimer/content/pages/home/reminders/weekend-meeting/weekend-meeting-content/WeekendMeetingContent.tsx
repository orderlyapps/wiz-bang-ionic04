import { IonList } from "@ionic/react";
import { WeekNavigation } from "@proclaimer-shared/components/navigation/week-navigation/WeekNavigation";

type WeekendMeetingContentProps = {
  week_id: string;
};

export function WeekendMeetingContent({ week_id }: WeekendMeetingContentProps) {
  return (
    <IonList>
      <WeekNavigation week_id={week_id} />
    </IonList>
  );
}
