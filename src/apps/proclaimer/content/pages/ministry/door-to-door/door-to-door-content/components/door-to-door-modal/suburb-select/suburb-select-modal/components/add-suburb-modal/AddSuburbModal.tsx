import { useState } from "react";
import { useLiveQuery, eq } from "@tanstack/react-db";
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
import { suburbCollection } from "@shared/database/collections/suburb";
import { mapMasterCollection } from "@shared/database/collections/map-master";
import { searchSuburbs } from "@util/vendor/mapbox/helper/searchSuburbs";
import { getStoredCongregation } from "@util/app/congregation/utils";
import type { MapboxGeocodingFeature } from "@util/vendor/mapbox/types/MapboxGeocodingResponse";
import type { Suburb } from "@shared/database/schemas/suburb";

type AddSuburbModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onAdded: (suburb: Suburb) => void;
};

function getBboxFromBoundary(boundary: unknown): [number, number, number, number] | undefined {
  if (!Array.isArray(boundary) || boundary.length === 0) return undefined;
  const coords = boundary as [number, number][];
  const lngs = coords.map((c) => c[0]);
  const lats = coords.map((c) => c[1]);
  return [Math.min(...lngs), Math.min(...lats), Math.max(...lngs), Math.max(...lats)];
}

export function AddSuburbModal({ isOpen, onDidDismiss, onAdded }: AddSuburbModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MapboxGeocodingFeature[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSuburb, setSelectedSuburb] = useState<MapboxGeocodingFeature | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const congregationId = getStoredCongregation()?.id;

  const { data: mapMasterData } = useLiveQuery(
    (q) => {
      if (!congregationId) return undefined;
      return q
        .from({ mm: mapMasterCollection })
        .where(({ mm }) => eq(mm.congregation_id, congregationId));
    },
    [congregationId],
  );

  const boundary = mapMasterData?.[0]?.boundary;
  const boundaryBbox = getBboxFromBoundary(boundary);

  async function handleSearch(query: string) {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const results = await searchSuburbs(query, boundaryBbox);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching suburbs:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  async function handleConfirm() {
    if (!selectedSuburb) return;
    const congregationId = getStoredCongregation()?.id;
    if (!congregationId) {
      setErrorMessage("No congregation selected");
      setSelectedSuburb(null);
      return;
    }
    if (!selectedSuburb.properties.bbox) {
      setErrorMessage("Suburb does not have a bounding box");
      setSelectedSuburb(null);
      return;
    }
    try {
      const newSuburb: Suburb = {
        id: crypto.randomUUID(),
        congregation_id: congregationId,
        name: selectedSuburb.properties.name,
        bbox: Array.from(selectedSuburb.properties.bbox),
      };
      const tx = suburbCollection.insert(newSuburb);
      await tx.isPersisted.promise;
      setSelectedSuburb(null);
      handleClose();
      onAdded(newSuburb);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("suburb_congregation_id_name_key")) {
        setErrorMessage("This suburb has already been added");
      } else {
        setErrorMessage(message);
      }
      setSelectedSuburb(null);
    }
  }

  function handleClose() {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
    setSelectedSuburb(null);
    onDidDismiss();
  }

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Suburb</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={handleClose} skip_confirmation />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchQuery}
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
        {!isSearching && searchResults.length > 0 && (
          <IonList>
            {searchResults.map((suburb) => (
              <IonItem
                key={suburb.id}
                button
                detail={false}
                onClick={() => setSelectedSuburb(suburb)}
              >
                <IonLabel>{suburb.properties.name}</IonLabel>
                <IonIcon icon={addOutline} slot="end" color="primary" />
              </IonItem>
            ))}
          </IonList>
        )}
        {!isSearching && searchQuery && searchResults.length === 0 && (
          <div className="ion-padding ion-text-center">
            <IonLabel color="medium">No suburbs found</IonLabel>
          </div>
        )}
        {!searchQuery && (
          <div className="ion-padding ion-text-center">
            <IonLabel color="medium">Search for a suburb to add</IonLabel>
          </div>
        )}
      </IonContent>
      <IonAlert
        isOpen={!!selectedSuburb}
        header="Add New Suburb"
        message={selectedSuburb ? `Add "${selectedSuburb.properties.name}"?` : ""}
        buttons={[
          { text: "Cancel", role: "cancel", handler: () => setSelectedSuburb(null) },
          { text: "Add", role: "confirm", handler: handleConfirm },
        ]}
        onDidDismiss={() => setSelectedSuburb(null)}
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
