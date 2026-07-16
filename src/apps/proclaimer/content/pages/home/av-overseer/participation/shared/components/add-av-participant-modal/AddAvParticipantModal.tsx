import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Body } from "@ui/components/display/text/body/Body";
import { useAvParticipantPublishers } from "@proclaimer-content/pages/home/av-overseer/participation/shared/hooks/useAvParticipantPublishers";
import type { AvParticipation } from "@shared/database/schemas/av-participation";

interface AddAvParticipantModalProps {
  participation_id: AvParticipation["participation_id"];
  modal_title: string;
  is_open: boolean;
  on_dismiss: () => void;
}

export function AddAvParticipantModal({
  participation_id,
  modal_title,
  is_open,
  on_dismiss,
}: AddAvParticipantModalProps) {
  const { nonParticipantPublishers, addParticipant, isLoading } =
    useAvParticipantPublishers(participation_id);

  function handleSelect(publisher_id: string) {
    addParticipant(publisher_id);
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add {modal_title}</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <IonItem key={i}>
                <IonLabel>
                  <IonSkeletonText style={{ width: "60%" }} />
                </IonLabel>
              </IonItem>
            ))
          ) : nonParticipantPublishers.length === 0 ? (
            <IonItem>
              <IonLabel>
                <Body color="medium">No available publishers.</Body>
              </IonLabel>
            </IonItem>
          ) : (
            nonParticipantPublishers
              .filter(({ publisher }) => publisher.id)
              .map(({ publisher, display_name }) => (
                <IonItem key={publisher.id} button onClick={() => handleSelect(publisher.id ?? "")}>
                  <IonLabel>{display_name}</IonLabel>
                </IonItem>
              ))
          )}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
