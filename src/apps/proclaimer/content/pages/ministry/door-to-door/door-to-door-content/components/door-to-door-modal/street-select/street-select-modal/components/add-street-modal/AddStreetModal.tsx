import { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonSearchbar,
  IonSpinner,
  IonAlert,
  IonToast,
  IonIcon,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { streetCollection } from "@shared/database/collections/street";
import { searchStreets } from "@util/vendor/mapbox/helper/searchStreets";
import { getStoredCongregation } from "@util/app/congregation/utils";
import type { MapboxGeocodingFeature } from "@util/vendor/mapbox/types/MapboxGeocodingResponse";
import type { Street } from "@shared/database/schemas/street";
import type { Suburb } from "@shared/database/schemas/suburb";

type AddStreetModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onAdded: (street: Street) => void;
  suburb: Suburb | undefined;
};

export function AddStreetModal({ isOpen, onDidDismiss, onAdded, suburb }: AddStreetModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MapboxGeocodingFeature[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedStreet, setSelectedStreet] = useState<MapboxGeocodingFeature | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSearch(query: string) {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    if (!suburb?.bbox || suburb.bbox.length < 4) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const bbox = suburb.bbox as [number, number, number, number];
      const results = await searchStreets(query, bbox);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching streets:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  async function handleConfirm() {
    if (!selectedStreet || !suburb?.id) return;
    const congregationId = getStoredCongregation()?.id;
    if (!congregationId) {
      setErrorMessage("No congregation selected");
      setSelectedStreet(null);
      return;
    }
    try {
      const newStreet: Street = {
        id: crypto.randomUUID(),
        congregation_id: congregationId,
        suburb_id: suburb.id,
        name: selectedStreet.properties.name,
        coordinates: Array.from(selectedStreet.geometry.coordinates),
      };
      const tx = streetCollection.insert(newStreet);
      await tx.isPersisted.promise;
      setSelectedStreet(null);
      handleClose();
      onAdded(newStreet);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("street_congregation_id_name_suburb_id_key")) {
        setErrorMessage("This street has already been added");
      } else {
        setErrorMessage(message);
      }
      setSelectedStreet(null);
    }
  }

  function handleClose() {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
    setSelectedStreet(null);
    onDidDismiss();
  }

  const matchedResults = suburb
    ? searchResults.filter((s) => s.properties.context.place?.name === suburb.name)
    : [];
  const unmatchedResults = suburb
    ? searchResults.filter((s) => s.properties.context.place?.name !== suburb.name)
    : [];

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Street</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={handleClose} skip_confirmation />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchQuery}
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
        {suburb && !isSearching && matchedResults.length > 0 && (
          <IonList>
            {matchedResults.map((street) => (
              <IonItem
                key={street.id}
                button
                detail={false}
                onClick={() => setSelectedStreet(street)}
              >
                <IonLabel>{street.properties.name}</IonLabel>
                <IonIcon icon={addOutline} slot="end" color="primary" />
              </IonItem>
            ))}
          </IonList>
        )}
        {suburb && !isSearching && unmatchedResults.length > 0 && (
          <IonList>
            <IonItem lines="none">
              <IonLabel color="medium">If you are looking for...</IonLabel>
            </IonItem>
            {unmatchedResults.map((street) => (
              <IonItem key={street.id} lines="none">
                <IonLabel>
                  <strong>{street.properties.name}</strong>,{" "}
                  <strong>{street.properties.context.place?.name}</strong>
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
        {suburb && !isSearching && searchQuery && searchResults.length === 0 && (
          <div className="ion-padding ion-text-center">
            <IonLabel color="medium">No matches found</IonLabel>
          </div>
        )}
        {suburb && !searchQuery && (
          <div className="ion-padding ion-text-center">
            <IonLabel color="medium">Search for a street to add</IonLabel>
          </div>
        )}
      </IonContent>
      <IonAlert
        isOpen={!!selectedStreet}
        header="Add New Street"
        message={
          selectedStreet && suburb
            ? `Add "${selectedStreet.properties.name}" to ${suburb.name}?`
            : ""
        }
        buttons={[
          { text: "Cancel", role: "cancel", handler: () => setSelectedStreet(null) },
          { text: "Add", role: "confirm", handler: handleConfirm },
        ]}
        onDidDismiss={() => setSelectedStreet(null)}
      />
      <IonToast
        isOpen={!!errorMessage}
        message={errorMessage ?? ""}
        duration={3000}
        color="danger"
        position="bottom"
        onDidDismiss={() => setErrorMessage(null)}
      />
    </ResponsiveModal>
  );
}
