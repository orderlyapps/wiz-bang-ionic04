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
import type { Street } from "@shared/database/schemas/street";
import type { SuburbRef } from "../../../../../../../../types";
import { useAddStreetSearch } from "./useAddStreetSearch";

type AddStreetModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onAdded: (street: Street) => void;
  suburb: SuburbRef | undefined;
};

export function AddStreetModal({ isOpen, onDidDismiss, onAdded, suburb }: AddStreetModalProps) {
  const {
    query,
    matched,
    unmatched,
    isSearching,
    selected,
    error,
    setSelected,
    setError,
    handleSearch,
    handleConfirm,
    reset,
  } = useAddStreetSearch(suburb);

  function handleClose() {
    reset();
    onDidDismiss();
  }

  async function handleConfirmAndClose() {
    const street = await handleConfirm();
    if (street) {
      handleClose();
      onAdded(street);
    }
  }

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Street</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleClose}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={query}
            onIonInput={(e) => handleSearch(e.detail.value ?? "")}
            placeholder="Search for a street..."
            debounce={500}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!suburb && (
          <div className="ion-padding ion-text-center">
            <IonLabel color="medium">Please select a suburb first</IonLabel>
          </div>
        )}
        {suburb && isSearching && (
          <div className="ion-padding ion-text-center">
            <IonSpinner />
          </div>
        )}
        {suburb && !isSearching && matched.length > 0 && (
          <IonList>
            {matched.map((s) => (
              <IonItem key={s.id} button detail={false} onClick={() => setSelected(s)}>
                <IonLabel>{s.properties.name}</IonLabel>
                <IonIcon icon={addOutline} slot="end" color="primary" />
              </IonItem>
            ))}
          </IonList>
        )}
        {suburb && !isSearching && unmatched.length > 0 && (
          <IonList>
            <IonItem lines="none">
              <IonLabel color="medium">If you are looking for...</IonLabel>
            </IonItem>
            {unmatched.map((s) => (
              <IonItem key={s.id} lines="none">
                <IonLabel>
                  <strong>{s.properties.name}</strong>,{" "}
                  <strong>{s.properties.context?.place?.name}</strong>
                </IonLabel>
              </IonItem>
            ))}
            <IonItem lines="none">
              <IonLabel color="medium" slot="end">
                ...try selecting another suburb
              </IonLabel>
            </IonItem>
          </IonList>
        )}
        {suburb && !isSearching && query && matched.length === 0 && unmatched.length === 0 && (
          <div className="ion-padding ion-text-center">
            <IonLabel color="medium">No matches found</IonLabel>
          </div>
        )}
        {suburb && !query && (
          <div className="ion-padding ion-text-center">
            <IonLabel color="medium">Search for a street to add</IonLabel>
          </div>
        )}
      </IonContent>
      <IonAlert
        isOpen={!!selected}
        header="Add New Street"
        message={selected && suburb ? `Add "${selected.properties.name}" to ${suburb.name}?` : ""}
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
