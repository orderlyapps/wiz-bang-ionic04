import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { AddParticipantModal } from "@proclaimer-content/pages/home/av-overseer/participants/components/add-participant-modal/AddParticipantModal";

export function ParticipantsHeader() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/av-overseer" />
        </IonButtons>
        <IonTitle>Participants</IonTitle>
        <IonButtons slot="end">
          <AddIconButton on_click={() => setShowModal(true)} />
        </IonButtons>
      </IonToolbar>
      <AddParticipantModal is_open={showModal} on_dismiss={() => setShowModal(false)} />
    </>
  );
}
