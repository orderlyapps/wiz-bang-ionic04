import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { AddAvParticipantModal } from "@proclaimer-content/pages/home/av-overseer/participation/shared/components/add-av-participant-modal/AddAvParticipantModal";

interface AvParticipationTypeHeaderProps {
  participation_id: string;
  label: string;
}

export function AvParticipationTypeHeader({
  participation_id,
  label,
}: AvParticipationTypeHeaderProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/av-overseer/participation" />
        </IonButtons>
        <IonTitle>{label}</IonTitle>
        <IonButtons slot="end">
          <AddIconButton on_click={() => setShowModal(true)} />
        </IonButtons>
      </IonToolbar>
      <AddAvParticipantModal
        participation_id={participation_id}
        modal_title={label}
        is_open={showModal}
        on_dismiss={() => setShowModal(false)}
      />
    </>
  );
}
