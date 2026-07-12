import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { AddParticipantModal } from "@proclaimer-content/pages/home/clam-overseer/participation/shared/components/add-participant-modal/AddParticipantModal";

export function CbsConductorHeader() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/clam-overseer/participation" />
        </IonButtons>
        <IonTitle>CBS Conductor</IonTitle>
        <IonButtons slot="end">
          <AddIconButton on_click={() => setShowModal(true)} />
        </IonButtons>
      </IonToolbar>
      <AddParticipantModal
        participation_id="cbs_conductor"
        modal_title="CBS Conductor"
        is_open={showModal}
        on_dismiss={() => setShowModal(false)}
      />
    </>
  );
}
