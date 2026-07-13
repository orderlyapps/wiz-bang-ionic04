import { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonToast,
  useIonAlert,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { returnVisitCollection } from "@shared/database/collections/return-visit";
import { VisitList } from "./components/visit-list/VisitList";
import { AddVisitForm } from "./components/add-visit-form/AddVisitForm";
import { handleAddVisit } from "./handlers/handleAddVisit";
import type { ReturnVisit } from "../layers/return-visit-source/types";
import { useReturnVisitLive } from "./hooks/useReturnVisitLive";

type ReturnVisitModalProps = {
  selected: ReturnVisit | null;
  onDismiss: () => void;
};

export function ReturnVisitModal({ selected, onDismiss }: ReturnVisitModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [presentAlert] = useIonAlert();
  const liveRecord = useReturnVisitLive(selected?.id);
  const visitLog = liveRecord?.visit_log ?? selected?.visit_log ?? [];

  const address = selected
    ? `${selected.house_number}${selected.unit_number ? `/${selected.unit_number}` : ""} ${selected.street}, ${selected.suburb}`
    : "";

  function handleSave(visited_at: string, notes: string) {
    if (!selected?.id) return;
    try {
      handleAddVisit(selected.id, { visited_at, notes });
      setShowAddForm(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to add visit");
    }
  }

  function handleDelete() {
    if (!selected?.id) return;
    void presentAlert({
      header: "Delete Return Visit",
      message: "This will permanently delete this return visit and all its visit logs.",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Delete",
          role: "confirm",
          handler: () => {
            try {
              returnVisitCollection.delete(selected.id!);
              onDismiss();
            } catch (error) {
              setErrorMessage(error instanceof Error ? error.message : "Failed to delete");
            }
          },
        },
      ],
    });
  }

  return (
    <>
      <ResponsiveModal isOpen={!!selected} onDidDismiss={onDismiss}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Return Visit</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton on_click={onDismiss} skip_confirmation />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{address}</IonTitle>
            </IonToolbar>
          </IonHeader>
          {showAddForm ? (
            <AddVisitForm onSave={handleSave} onCancel={() => setShowAddForm(false)} />
          ) : (
            <>
              <VisitList visits={visitLog} />
              <Space />
              <TextButton label="Add Visit" fill="outline" on_click={() => setShowAddForm(true)} />
              <Space />
              <TextButton
                label="Delete Return Visit"
                color="danger"
                fill="clear"
                on_click={handleDelete}
              />
            </>
          )}
        </IonContent>
      </ResponsiveModal>
      <IonToast
        isOpen={!!errorMessage}
        message={errorMessage ?? ""}
        duration={3000}
        color="danger"
        onDidDismiss={() => setErrorMessage(null)}
      />
    </>
  );
}
