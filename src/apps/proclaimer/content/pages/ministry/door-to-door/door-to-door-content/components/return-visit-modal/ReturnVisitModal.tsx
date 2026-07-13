import { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonToast,
  useIonAlert,
  IonItem,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { returnVisitCollection } from "@shared/database/collections/return-visit";
import { VisitList } from "./components/visit-list/VisitList";
import { AddVisitForm } from "./components/add-visit-form/AddVisitForm";
import { PersonDetailsForm } from "./components/person-details-form/PersonDetailsForm";
import { PersonDetailsSection } from "./components/person-details-section/PersonDetailsSection";
import { handleAddVisit } from "./handlers/handleAddVisit";
import { handleEditVisit } from "./handlers/handleEditVisit";
import { handleUpdatePersonDetails } from "./handlers/handleUpdatePersonDetails";
import type { PersonDetails } from "./handlers/handleUpdatePersonDetails";
import type { VisitLogEntry } from "@shared/database/schemas/return-visit";
import type { ReturnVisit } from "../layers/return-visit-source/types";
import { useReturnVisitLive } from "./hooks/useReturnVisitLive";
import { Heading } from "@ui/components/display/text/heading/Heading";

type ReturnVisitModalProps = {
  selected: ReturnVisit | null;
  onDismiss: () => void;
};

export function ReturnVisitModal({ selected, onDismiss }: ReturnVisitModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPersonDetails, setShowPersonDetails] = useState(false);
  const [editingVisit, setEditingVisit] = useState<VisitLogEntry | null>(null);
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
      if (editingVisit) {
        handleEditVisit(selected.id, editingVisit.id, { visited_at, notes });
        setEditingVisit(null);
      } else {
        handleAddVisit(selected.id, { visited_at, notes });
        setShowAddForm(false);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to save visit");
    }
  }

  function handleEditVisitClick(visit: VisitLogEntry) {
    setEditingVisit(visit);
  }

  function handleCancelForm() {
    setShowAddForm(false);
    setEditingVisit(null);
  }

  function handleSavePersonDetails(details: PersonDetails) {
    if (!selected?.id) return;
    try {
      handleUpdatePersonDetails(selected.id, details);
      setShowPersonDetails(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to save details");
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
          <PersonDetailsSection
            address={address}
            first_name={liveRecord?.first_name ?? ""}
            last_name={liveRecord?.last_name ?? ""}
            phone_number={liveRecord?.phone_number ?? ""}
            notes={liveRecord?.notes ?? ""}
          />

          <Space />
          
          <IonItem>
            <Heading>Visits</Heading>
          </IonItem>
          {showAddForm || editingVisit ? (
            <AddVisitForm
              onSave={handleSave}
              onCancel={handleCancelForm}
              initialVisit={editingVisit ?? undefined}
            />
          ) : showPersonDetails ? (
            <PersonDetailsForm
              initial={{
                first_name: liveRecord?.first_name ?? "",
                last_name: liveRecord?.last_name ?? "",
                phone_number: liveRecord?.phone_number ?? "",
                notes: liveRecord?.notes ?? "",
              }}
              onSave={handleSavePersonDetails}
              onCancel={() => setShowPersonDetails(false)}
            />
          ) : (
            <>
              <VisitList visits={visitLog} onEditVisit={handleEditVisitClick} />
              <Space />
              <TextButton label="Add Visit" fill="outline" on_click={() => setShowAddForm(true)} />
              <Space />
              <TextButton
                label="Person Details"
                fill="outline"
                on_click={() => setShowPersonDetails(true)}
              />
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
