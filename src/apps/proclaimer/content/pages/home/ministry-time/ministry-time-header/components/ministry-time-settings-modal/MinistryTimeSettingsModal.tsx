import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";

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
      <IonContent />
    </ResponsiveModal>
  );
}
