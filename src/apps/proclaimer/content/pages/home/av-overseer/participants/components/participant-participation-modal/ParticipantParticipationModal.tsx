import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import {
  avParticipationTypeLabels,
  avParticipationTypes,
} from "@proclaimer-content/pages/home/av-overseer/participation/shared/constants/avParticipationTypeLabels";

interface ParticipantParticipationModalProps {
  participant_id: string;
  display_name: string;
  active_participation_ids: string[];
  is_open: boolean;
  on_dismiss: () => void;
  on_toggle: (participation_id: string, checked: boolean) => void;
}

export function ParticipantParticipationModal({
  display_name,
  active_participation_ids,
  is_open,
  on_dismiss,
  on_toggle,
}: ParticipantParticipationModalProps) {
  const activeSet = new Set(active_participation_ids);

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{display_name}</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {avParticipationTypes.map((type) => (
            <IonItem key={type}>
              <IonLabel>{avParticipationTypeLabels[type]}</IonLabel>
              <IonToggle
                slot="end"
                checked={activeSet.has(type)}
                onIonChange={(e) => on_toggle(type, e.detail.checked)}
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
