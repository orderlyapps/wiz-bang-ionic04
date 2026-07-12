import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { AvAssignment } from "@shared/database/schemas/av-assignment";
import type { WeekendAssignment } from "@shared/database/schemas/weekend-assignment";
import type { SpeakerAssignment } from "@shared/database/schemas/speaker-assignment";
import { WeekendAssignmentHistory } from "./components/weekend-assignment-history/WeekendAssignmentHistory";

interface WeekendConfirmModalProps {
  is_open: boolean;
  publisher: Publisher | undefined;
  week_id: string;
  weekend_assignments: WeekendAssignment[];
  speaker_assignments: SpeakerAssignment[];
  av_assignments: AvAssignment[];
  on_dismiss: () => void;
  on_confirm: () => void;
}

export function WeekendConfirmModal({
  is_open,
  publisher,
  week_id,
  weekend_assignments,
  speaker_assignments,
  av_assignments,
  on_dismiss,
  on_confirm,
}: WeekendConfirmModalProps) {
  function handleConfirm() {
    on_confirm();
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {publisher ? `${publisher.first_name} ${publisher.last_name}` : "Confirm Assignment"}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={on_dismiss}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {publisher?.id && (
          <WeekendAssignmentHistory
            publisher_id={publisher.id}
            week_id={week_id}
            weekend_assignments={weekend_assignments}
            speaker_assignments={speaker_assignments}
            av_assignments={av_assignments}
          />
        )}
        <div className="ion-padding">
          <IonButton expand="block" onClick={handleConfirm}>
            Assign to Schedule
          </IonButton>
        </div>
      </IonContent>
    </ResponsiveModal>
  );
}
