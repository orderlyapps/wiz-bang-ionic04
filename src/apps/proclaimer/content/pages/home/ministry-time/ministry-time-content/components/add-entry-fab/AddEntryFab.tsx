import { useState } from "react";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { TimeEntryForm } from "../time-entry-form/TimeEntryForm";
import type { MinistryType } from "@shared/database/rxdb/collections/ministry-time";

interface AddEntryFabProps {
  on_add: (
    date: string,
    start_time: string,
    end_time: string,
    ministry_type: MinistryType,
    note: string,
  ) => void;
}

export function AddEntryFab({ on_add }: AddEntryFabProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleAdd(
    date: string,
    start_time: string,
    end_time: string,
    ministry_type: MinistryType,
    note: string,
  ) {
    on_add(date, start_time, end_time, ministry_type, note);
    setIsOpen(false);
  }

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => setIsOpen(true)}>
          <IonIcon icon={addOutline} />
        </IonFabButton>
      </IonFab>
      <ResponsiveModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add Entry</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton on_click={() => setIsOpen(false)} skip_confirmation />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <TimeEntryForm on_add={handleAdd} />
        </IonContent>
      </ResponsiveModal>
    </>
  );
}
