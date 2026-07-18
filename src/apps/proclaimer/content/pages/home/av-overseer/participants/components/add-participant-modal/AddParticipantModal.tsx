import { useState } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSkeletonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Body } from "@ui/components/display/text/body/Body";
import {
  avParticipationTypeLabels,
  avParticipationTypes,
} from "@proclaimer-content/pages/home/av-overseer/participation/shared/constants/avParticipationTypeLabels";
import { useAvParticipants } from "@proclaimer-content/pages/home/av-overseer/participants/shared/hooks/useAvParticipants/useAvParticipants";

interface AddParticipantModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function AddParticipantModal({ is_open, on_dismiss }: AddParticipantModalProps) {
  const { nonParticipants, isLoading, addParticipation } = useAvParticipants();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");

  const selected = selectedId !== null;

  function handleSelectPublisher(participant_id: string, display_name: string) {
    setSelectedId(participant_id);
    setSelectedName(display_name);
  }

  function handleToggle(participation_id: string, checked: boolean) {
    if (checked && selectedId) {
      addParticipation(selectedId, participation_id);
    }
  }

  function handleDismiss() {
    setSelectedId(null);
    setSelectedName("");
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{selected ? selectedName : "Add Participant"}</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={handleDismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!selected ? (
          <IonList>
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <IonItem key={i}>
                  <IonLabel>
                    <IonSkeletonText style={{ width: "60%" }} />
                  </IonLabel>
                </IonItem>
              ))
            ) : nonParticipants.length === 0 ? (
              <IonItem>
                <IonLabel>
                  <Body color="medium">No available publishers.</Body>
                </IonLabel>
              </IonItem>
            ) : (
              nonParticipants.map((p) => (
                <IonItem
                  key={p.participant_id}
                  button
                  detail
                  onClick={() => handleSelectPublisher(p.participant_id, p.display_name)}
                >
                  <IonLabel>{p.display_name}</IonLabel>
                </IonItem>
              ))
            )}
          </IonList>
        ) : (
          <IonList>
            {avParticipationTypes.map((type) => (
              <IonItem key={type}>
                <IonLabel>{avParticipationTypeLabels[type]}</IonLabel>
                <IonToggle slot="end" onIonChange={(e) => handleToggle(type, e.detail.checked)} />
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
