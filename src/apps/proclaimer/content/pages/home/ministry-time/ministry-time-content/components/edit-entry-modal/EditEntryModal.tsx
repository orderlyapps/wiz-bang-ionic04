import { IonHeader, IonToolbar, IonTitle, IonButtons, IonContent } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { TimeEntryForm } from "../time-entry-form/TimeEntryForm";
import type { MinistryTimeEntry } from "../../hooks/useMinistryTime";
import type { MinistryType } from "@shared/database/rxdb/collections/ministry-time";

interface EditEntryModalProps {
  entry: MinistryTimeEntry | null;
  on_update: (
    id: string,
    date: string,
    start_time: string,
    end_time: string,
    ministry_type: MinistryType,
    note: string,
  ) => void;
  on_close: () => void;
}

export function EditEntryModal({ entry, on_update, on_close }: EditEntryModalProps) {
  if (!entry) return null;
  const entry_id = entry.entry_id;

  function handleUpdate(
    date: string,
    start_time: string,
    end_time: string,
    ministry_type: MinistryType,
    note: string,
  ) {
    on_update(entry_id, date, start_time, end_time, ministry_type, note);
    on_close();
  }

  return (
    <ResponsiveModal isOpen onDidDismiss={on_close}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Entry</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_close} skip_confirmation />
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
            ministry_type: entry.ministry_type as MinistryType,
            note: entry.note,
          }}
        />
      </IonContent>
    </ResponsiveModal>
  );
}
