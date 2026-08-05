import { IonButton, IonIcon, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { close } from "ionicons/icons";

interface StudySettingsHeaderProps {
  on_dismiss: () => void;
}

export function StudySettingsHeader({ on_dismiss }: StudySettingsHeaderProps) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>Settings</IonTitle>
        <IonButton fill="clear" onClick={on_dismiss} slot="end">
          <IonIcon slot="icon-only" icon={close} />
        </IonButton>
      </IonToolbar>
    </IonHeader>
  );
}
