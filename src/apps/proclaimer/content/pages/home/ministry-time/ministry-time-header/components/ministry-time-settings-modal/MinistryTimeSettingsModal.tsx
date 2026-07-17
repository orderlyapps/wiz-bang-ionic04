import { IonHeader, IonToolbar, IonTitle, IonButtons, IonContent } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Space } from "@ui/components/layout/space/Space";
import { PioneerHoursSettings } from "../../../ministry-time-content/components/pioneer-stats/adjust-hours-modal/PioneerHoursSettings";
import { DataManagement } from "./components/data-management/DataManagement";
import { SubmitMinistryTime } from "./components/submit-ministry-time/SubmitMinistryTime";

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
            <CloseIconButton on_click={on_close} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SubmitMinistryTime />
        <Space size="lg" />
        <PioneerHoursSettings />
        <Space size="lg" />
        <DataManagement />
      </IonContent>
    </ResponsiveModal>
  );
}
