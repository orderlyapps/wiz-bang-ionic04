import { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSkeletonText,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { streetCollection } from "@shared/database/collections/street";
import { useLiveQuery, eq } from "@tanstack/react-db";
import type { Street } from "@shared/database/schemas/street";
import type { Suburb } from "@shared/database/schemas/suburb";
import { AddStreetModal } from "./components/add-street-modal/AddStreetModal";

type StreetSelectModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSelect: (street: Street) => void;
  suburbId?: string;
  suburb?: Suburb;
};

export function StreetSelectModal({
  isOpen,
  onDidDismiss,
  onSelect,
  suburbId,
  suburb,
}: StreetSelectModalProps) {
  const [showAddStreet, setShowAddStreet] = useState(false);

  const { data: streets, isLoading } = useLiveQuery(
    (q) => {
      if (!suburbId) return undefined;
      return q
        .from({ street: streetCollection })
        .where(({ street }) => eq(street.suburb_id, suburbId));
    },
    [suburbId],
  );

  const sortedStreets = streets ? [...streets].sort((a, b) => a.name.localeCompare(b.name)) : [];

  function handleAdded(street: Street) {
    onSelect(street);
    onDidDismiss();
  }

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Street</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!suburbId ? (
          <IonList>
            <IonItem>
              <IonLabel>Please select a suburb first</IonLabel>
            </IonItem>
          </IonList>
        ) : isLoading ? (
          <IonList>
            {[1, 2, 3].map((i) => (
              <IonItem key={i}>
                <IonLabel>
                  <IonSkeletonText style={{ width: "50%" }} />
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <IonList>
            <IonItem onClick={() => setShowAddStreet(true)} button detail={false}>
              <IonIcon icon={addOutline} slot="start" color="primary" />
              <IonLabel color="primary">Add New Street</IonLabel>
            </IonItem>
            {sortedStreets.map((street) => (
              <IonItem
                key={street.id}
                onClick={() => {
                  onSelect(street);
                  onDidDismiss();
                }}
                button
                detail={false}
              >
                <IonLabel>{street.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
      <AddStreetModal
        isOpen={showAddStreet}
        onDidDismiss={() => setShowAddStreet(false)}
        onAdded={handleAdded}
        suburb={suburb}
      />
    </ResponsiveModal>
  );
}
