import { useEffect, useRef, useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonToast,
  useIonAlert,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
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
import type { VisitLogEntry } from "@shared/database/schemas/return-visit";
import type { ReturnVisit } from "../layers/return-visit-source/types";
import { useReturnVisitLive } from "./hooks/useReturnVisitLive";
import { Heading } from "@ui/components/display/text/heading/Heading";

type ReturnVisitModalProps = {
  selected: ReturnVisit | null;
  onDismiss: () => void;
  onEditLocation?: (rv: ReturnVisit) => void;
};

export function ReturnVisitModal({ selected, onDismiss, onEditLocation }: ReturnVisitModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPersonDetails, setShowPersonDetails] = useState(false);
  const [editingVisit, setEditingVisit] = useState<VisitLogEntry | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [presentAlert] = useIonAlert();
  const liveRecord = useReturnVisitLive(selected?.id);
  const visitLog = liveRecord?.visit_log ?? selected?.visit_log ?? [];
  const isDismissedRef = useRef(false);

  useEffect(() => {
    if (selected) {
      isDismissedRef.current = false;
    }
  }, [selected]);

  function handleDismiss() {
    if (isDismissedRef.current) return;
    isDismissedRef.current = true;
    setShowAddForm(false);
    setShowPersonDetails(false);
    setEditingVisit(null);
    setErrorMessage(null);
    onDismiss();
  }

  const address = selected
    ? `${selected.house_number}${selected.unit_number ? `/${selected.unit_number}` : ""} ${selected.street}, ${selected.suburb}`
    : "";

  function handleSave(visited_at: string, notes: string) {
    if (!selected?.id) return;
    try {
      handleAddVisit(selected.id, { visited_at, notes });
      setShowAddForm(false);
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
              handleDismiss();
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
      <ResponsiveModal isOpen={!!selected} onDidDismiss={handleDismiss}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Return Visit</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton on_click={handleDismiss} skip_confirmation />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {!showPersonDetails && !showAddForm && !editingVisit ? (
            <>
              <PersonDetailsSection
                address={address}
                first_name={liveRecord?.first_name ?? ""}
                last_name={liveRecord?.last_name ?? ""}
                phone_number={liveRecord?.phone_number ?? ""}
                notes={liveRecord?.notes ?? ""}
                lat={selected?.coordinates?.[1]}
                lng={selected?.coordinates?.[0]}
              />
              <TextButton label="Edit" fill="clear" on_click={() => setShowPersonDetails(true)} />
            </>
          ) : selected && !showAddForm && !editingVisit ? (
            <PersonDetailsForm
              id={selected.id!}
              initial={{
                first_name: liveRecord?.first_name ?? "",
                last_name: liveRecord?.last_name ?? "",
                phone_number: liveRecord?.phone_number ?? "",
                notes: liveRecord?.notes ?? "",
              }}
              onCancel={() => setShowPersonDetails(false)}
              onError={(msg) => setErrorMessage(msg)}
              onEditLocation={
                onEditLocation
                  ? () => {
                      handleDismiss();
                      onEditLocation(selected);
                    }
                  : undefined
              }
            />
          ) : null}

          <Space size="md" />

          {showAddForm || editingVisit ? (
            <AddVisitForm
              onSave={handleSave}
              onCancel={handleCancelForm}
              initialVisit={editingVisit ?? undefined}
              returnVisitId={selected?.id}
              onError={(msg) => setErrorMessage(msg)}
              onDelete={handleCancelForm}
            />
          ) : showPersonDetails ? null : (
            <>
              <IonItem>
                <Heading>Visits</Heading>
              </IonItem>
              <VisitList visits={visitLog} onEditVisit={handleEditVisitClick} />

              <Space size="lg" />

              <TextButton
                label="Delete Return Visit"
                color="danger"
                fill="clear"
                on_click={handleDelete}
              />
            </>
          )}

          {!showPersonDetails && !showAddForm && !editingVisit && (
            <IonFab vertical="bottom" horizontal="end" slot="fixed" className="ion-margin">
              <IonFabButton onClick={() => setShowAddForm(true)}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
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
