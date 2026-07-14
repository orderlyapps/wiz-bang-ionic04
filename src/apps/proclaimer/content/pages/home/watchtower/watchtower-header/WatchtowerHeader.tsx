import { IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonIcon } from "@ionic/react";
import { settings } from "ionicons/icons";

interface WatchtowerHeaderProps {
  on_settings: () => void;
}

export function WatchtowerHeader({ on_settings }: WatchtowerHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Watchtower</IonTitle>
      <IonButtons slot="end">
        <IonButton onClick={on_settings}>
          <IonIcon slot="icon-only" icon={settings} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
}
