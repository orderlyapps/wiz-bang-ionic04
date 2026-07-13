import { useState } from "react";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { TimeEntryForm } from "../time-entry-form/TimeEntryForm";

interface AddEntryFabProps {
  on_add: (date: string, start_time: string, end_time: string, note: string) => void;
}

export function AddEntryFab({ on_add }: AddEntryFabProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleAdd(date: string, start_time: string, end_time: string, note: string) {
    on_add(date, start_time, end_time, note);
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
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
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
