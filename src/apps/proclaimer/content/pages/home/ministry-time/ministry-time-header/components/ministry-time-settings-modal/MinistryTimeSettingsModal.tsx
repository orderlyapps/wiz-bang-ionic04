import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { PioneerHoursSettings } from "../../../ministry-time-content/components/pioneer-stats/adjust-hours-modal/PioneerHoursSettings";
import { DataManagement } from "./components/data-management/DataManagement";

interface MinistryTimeSettingsModalProps {
  isOpen: boolean;
  on_close: () => void;
}

export function MinistryTimeSettingsModal({ isOpen, on_close }: MinistryTimeSettingsModalProps) {
  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={on_close}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={on_close}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PioneerHoursSettings />
        <DataManagement />
      </IonContent>
    </ResponsiveModal>
  );
}
