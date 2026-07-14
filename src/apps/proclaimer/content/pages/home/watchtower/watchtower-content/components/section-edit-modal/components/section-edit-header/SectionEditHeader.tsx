import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";

interface SectionEditHeaderProps {
  title: string;
  on_dismiss: () => void;
}

export function SectionEditHeader({ title, on_dismiss }: SectionEditHeaderProps) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">
          <IonButton aria-label="Close" fill="clear" onClick={on_dismiss}>
            <IonIcon slot="icon-only" icon={close} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}
