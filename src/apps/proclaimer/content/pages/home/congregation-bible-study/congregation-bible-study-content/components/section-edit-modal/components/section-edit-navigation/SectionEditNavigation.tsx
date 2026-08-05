import { IonButton, IonIcon } from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";

interface SectionEditNavigationProps {
  has_previous: boolean;
  has_next: boolean;
  on_previous: () => void;
  on_next: () => void;
}

export function SectionEditNavigation({
  has_previous,
  has_next,
  on_previous,
  on_next,
}: SectionEditNavigationProps) {
  return (
    <div className="ion-text-center ion-padding-bottom">
      <IonButton fill="clear" disabled={!has_previous} onClick={on_previous} className="ion-margin">
        <IonIcon slot="start" icon={chevronBack} />
        Prev
      </IonButton>
      <IonButton fill="clear" disabled={!has_next} onClick={on_next} className="ion-margin">
        Next
        <IonIcon slot="end" icon={chevronForward} />
      </IonButton>
    </div>
  );
}
