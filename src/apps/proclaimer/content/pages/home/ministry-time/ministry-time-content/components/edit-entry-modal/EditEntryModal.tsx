import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { TimeEntryForm } from "../time-entry-form/TimeEntryForm";
import type { MinistryTimeEntry } from "../../hooks/useMinistryTime";

interface EditEntryModalProps {
  entry: MinistryTimeEntry | null;
  on_update: (id: string, date: string, start_time: string, end_time: string, note: string) => void;
  on_close: () => void;
}

export function EditEntryModal({ entry, on_update, on_close }: EditEntryModalProps) {
  if (!entry) return null;

  function handleUpdate(date: string, start_time: string, end_time: string, note: string) {
    on_update(entry.id, date, start_time, end_time, note);
    on_close();
  }

  return (
    <ResponsiveModal isOpen onDidDismiss={on_close}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Entry</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={on_close}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TimeEntryForm
          on_add={handleUpdate}
          initial_values={{
            date: entry.date,
            start_time: entry.start_time,
            end_time: entry.end_time,
            note: entry.note,
          }}
        />
      </IonContent>
    </ResponsiveModal>
  );
}
