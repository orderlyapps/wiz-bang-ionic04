import { IonList } from "@ionic/react";
import { WeekNavigation } from "@proclaimer-shared/components/navigation/week-navigation/WeekNavigation";
import { ClamAssignmentList } from "./components/clam-assignment-list/ClamAssignmentList";

type ClamContentProps = {
  week_id: string;
};

export function ClamContent({ week_id }: ClamContentProps) {
  return (
    <IonList>
      <WeekNavigation week_id={week_id} />
      <ClamAssignmentList week_id={week_id} />
    </IonList>
  );
}
