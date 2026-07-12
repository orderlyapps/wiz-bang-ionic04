import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import { AssignmentHistory } from "./components/assignment-history/AssignmentHistory";

interface PublisherSelectModalProps {
  is_open: boolean;
  publisher: Publisher | undefined;
  on_dismiss: () => void;
  on_confirm: () => void;
  week_id: string;
  all_assignments: MidweekAssignment[];
  publishers: Publisher[];
}

export function PublisherSelectModal({
  is_open,
  publisher,
  on_dismiss,
  on_confirm,
  week_id,
  all_assignments,
  publishers,
}: PublisherSelectModalProps) {
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
          <AssignmentHistory
            publisher_id={publisher.id}
            week_id={week_id}
            all_assignments={all_assignments}
            publishers={publishers}
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
