import { useState } from "react";
import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { PublisherSelectContent } from "@proclaimer-content/pages/settings/profile/profile-content/components/publisher-select/publisher-select-modal/publisher-select-content/PublisherSelectContent";
import {
  getStoredPublisher,
  getPublisherDisplayName,
} from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";

interface PdfPublisherSelectProps {
  on_change: (publisher: Publisher | null) => void;
}

export function PdfPublisherSelect({ on_change }: PdfPublisherSelectProps) {
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [publisher, setPublisher] = useState(getStoredPublisher);

  const handleSelect = (p: Publisher) => {
    setPublisher(p);
    on_change(p);
    setShowSelectModal(false);
  };

  return (
    <>
      <ModalSelect
        label="Publisher"
        display_value={publisher ? getPublisherDisplayName(publisher) : ""}
        placeholder="Select publisher..."
        on_open={() => setShowSelectModal(true)}
      />
      <ResponsiveModal isOpen={showSelectModal} onDidDismiss={() => setShowSelectModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Select Publisher</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton on_click={() => setShowSelectModal(false)} skip_confirmation />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding content-wide">
          <PublisherSelectContent
            onPublisherSelected={handleSelect}
            selectedPublisherId={publisher?.id}
          />
        </IonContent>
      </ResponsiveModal>
    </>
  );
}
