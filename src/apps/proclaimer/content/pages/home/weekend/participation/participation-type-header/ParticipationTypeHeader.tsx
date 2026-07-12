import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { AddWeekendParticipantModal } from "@proclaimer-content/pages/home/weekend/participation/shared/components/add-weekend-participant-modal/AddWeekendParticipantModal";

interface ParticipationTypeHeaderProps {
  participation_id: string;
  label: string;
}

export function ParticipationTypeHeader({ participation_id, label }: ParticipationTypeHeaderProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/weekend/participation" />
        </IonButtons>
        <IonTitle>{label}</IonTitle>
        <IonButtons slot="end">
          <AddIconButton on_click={() => setShowModal(true)} />
        </IonButtons>
      </IonToolbar>
      <AddWeekendParticipantModal
        participation_id={participation_id}
        modal_title={label}
        is_open={showModal}
        on_dismiss={() => setShowModal(false)}
      />
    </>
  );
}
