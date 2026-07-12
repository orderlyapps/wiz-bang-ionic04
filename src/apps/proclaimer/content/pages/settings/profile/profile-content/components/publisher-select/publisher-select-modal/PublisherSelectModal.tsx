import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { PublisherSelectContent } from "./publisher-select-content/PublisherSelectContent";

interface PublisherSelectModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onSelect?: () => void;
}

export function PublisherSelectModal({ isOpen, onDismiss, onSelect }: PublisherSelectModalProps) {
  const handleSelect = () => {
    onSelect?.();
    onDismiss();
  };

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Publisher</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding content-wide">
        <PublisherSelectContent onSelect={handleSelect} />
      </IonContent>
    </ResponsiveModal>
  );
}
