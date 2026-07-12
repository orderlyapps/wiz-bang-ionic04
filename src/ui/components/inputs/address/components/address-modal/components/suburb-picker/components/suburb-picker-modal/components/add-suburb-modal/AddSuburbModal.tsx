import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonSearchbar,
  IonSpinner,
  IonAlert,
  IonToast,
  IonIcon,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import type { Suburb } from "@shared/database/schemas/suburb";
import { useAddSuburbSearch } from "./useAddSuburbSearch";

type AddSuburbModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onAdded: (suburb: Suburb) => void;
};

export function AddSuburbModal({ isOpen, onDidDismiss, onAdded }: AddSuburbModalProps) {
  const {
    query,
    results,
    isSearching,
    selected,
    error,
    setSelected,
    setError,
    handleSearch,
    handleConfirm,
    reset,
  } = useAddSuburbSearch();

  function handleClose() {
    reset();
    onDidDismiss();
  }

  async function handleConfirmAndClose() {
    const suburb = await handleConfirm();
    if (suburb) {
      handleClose();
      onAdded(suburb);
    }
  }

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Suburb</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleClose}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={query}
            onIonInput={(e) => handleSearch(e.detail.value ?? "")}
            placeholder="Search for a suburb..."
            debounce={500}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isSearching && (
          <div className="ion-padding ion-text-center">
            <IonSpinner />
          </div>
        )}
        {!isSearching && results.length > 0 && (
          <IonList>
            {results.map((s) => (
              <IonItem key={s.id} button detail={false} onClick={() => setSelected(s)}>
                <IonLabel>{s.properties.name}</IonLabel>
                <IonIcon icon={addOutline} slot="end" color="primary" />
              </IonItem>
            ))}
          </IonList>
        )}
        {!isSearching && query && results.length === 0 && (
          <div className="ion-padding ion-text-center">
            <IonLabel color="medium">No suburbs found</IonLabel>
          </div>
        )}
        {!query && (
          <div className="ion-padding ion-text-center">
            <IonLabel color="medium">Search for a suburb to add</IonLabel>
          </div>
        )}
      </IonContent>
      <IonAlert
        isOpen={!!selected}
        header="Add New Suburb"
        message={selected ? `Add "${selected.properties.name}"?` : ""}
        buttons={[
          { text: "Cancel", role: "cancel", handler: () => setSelected(null) },
          { text: "Add", role: "confirm", handler: handleConfirmAndClose },
        ]}
        onDidDismiss={() => setSelected(null)}
      />
      <IonToast
        isOpen={!!error}
        message={error ?? ""}
        duration={3000}
        color="danger"
        position="bottom"
        onDidDismiss={() => setError(null)}
      />
    </ResponsiveModal>
  );
}
