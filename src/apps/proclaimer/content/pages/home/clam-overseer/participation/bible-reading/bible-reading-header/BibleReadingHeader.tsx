import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { AddParticipantModal } from "@proclaimer-content/pages/home/clam-overseer/participation/shared/components/add-participant-modal/AddParticipantModal";

export function BibleReadingHeader() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/clam-overseer/participation" />
        </IonButtons>
        <IonTitle>Bible Reading</IonTitle>
        <IonButtons slot="end">
          <AddIconButton on_click={() => setShowModal(true)} />
        </IonButtons>
      </IonToolbar>
      <AddParticipantModal
        participation_id="bible_reading"
        modal_title="Bible Reading"
        is_open={showModal}
        on_dismiss={() => setShowModal(false)}
      />
    </>
  );
}
