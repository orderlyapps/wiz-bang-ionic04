import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";

export function BranchReportContent() {
  return (
    <IonList>
      <IonItem lines="none" className="ion-padding">
        <IonLabel>
          <Body color="medium">Branch report content coming soon.</Body>
        </IonLabel>
      </IonItem>
    </IonList>
  );
}
