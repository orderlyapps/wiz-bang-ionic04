import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons } from "@ionic/react";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { MapDisplaySetting } from "./components/MapDisplaySetting";
import { MapStyleSetting } from "./components/MapStyleSetting";
import { QuickLinksSetting } from "./components/QuickLinksSetting";
import { ReturnVisitDataManagement } from "./components/return-visit-data-management/ReturnVisitDataManagement";

interface SettingsModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function SettingsModal({ is_open, on_dismiss }: SettingsModalProps) {
  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MapStyleSetting />
        <MapDisplaySetting />
        <QuickLinksSetting />
        <ReturnVisitDataManagement />
      </IonContent>
    </ResponsiveModal>
  );
}
