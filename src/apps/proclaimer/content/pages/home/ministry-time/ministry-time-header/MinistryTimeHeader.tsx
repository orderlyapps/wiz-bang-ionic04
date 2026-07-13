import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonIcon } from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import { MinistryTimeSettingsModal } from "./components/ministry-time-settings-modal/MinistryTimeSettingsModal";

export function MinistryTimeHeader() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>Ministry Time</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => setSettingsOpen(true)}>
            <IonIcon slot="icon-only" icon={settingsOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <MinistryTimeSettingsModal isOpen={settingsOpen} on_close={() => setSettingsOpen(false)} />
    </>
  );
}
