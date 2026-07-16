import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { AvAssignment, AvAssignmentID } from "@shared/database/schemas/av-assignment";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { WeekendAssignment } from "@shared/database/schemas/weekend-assignment";
import type { SpeakerAssignment } from "@shared/database/schemas/speaker-assignment";
import { AvAssignmentHistory } from "./components/av-assignment-history/AvAssignmentHistory";

interface AvConfirmModalProps {
  is_open: boolean;
  publisher: Publisher | undefined;
  week_id: string;
  assignment_id: AvAssignmentID;
  all_assignments: AvAssignment[];
  midweek_assignments: MidweekAssignment[];
  weekend_assignments: WeekendAssignment[];
  speaker_assignments: SpeakerAssignment[];
  on_dismiss: () => void;
  on_confirm: () => void;
}

export function AvConfirmModal({
  is_open,
  publisher,
  week_id,
  assignment_id,
  all_assignments,
  midweek_assignments,
  weekend_assignments,
  speaker_assignments,
  on_dismiss,
  on_confirm,
}: AvConfirmModalProps) {
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
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {publisher?.id && (
          <AvAssignmentHistory
            publisher_id={publisher.id}
            week_id={week_id}
            assignment_id={assignment_id}
            all_assignments={all_assignments}
            midweek_assignments={midweek_assignments}
            weekend_assignments={weekend_assignments}
            speaker_assignments={speaker_assignments}
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
