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
import { suburbCollection } from "@shared/database/collections/suburb";
import { useLiveQuery } from "@tanstack/react-db";
import type { Suburb } from "@shared/database/schemas/suburb";
import { AddSuburbModal } from "./components/add-suburb-modal/AddSuburbModal";

type SuburbSelectModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSelect: (suburb: Suburb) => void;
};

export function SuburbSelectModal({ isOpen, onDidDismiss, onSelect }: SuburbSelectModalProps) {
  const [showAddSuburb, setShowAddSuburb] = useState(false);
  const { data: suburbs, isLoading } = useLiveQuery((q) => q.from({ suburb: suburbCollection }));

  // Sort suburbs alphabetically by name
  const sortedSuburbs = suburbs ? [...suburbs].sort((a, b) => a.name.localeCompare(b.name)) : [];

  function handleAdded(suburb: Suburb) {
    onSelect(suburb);
    onDidDismiss();
  }

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Suburb</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoading ? (
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
            <IonItem onClick={() => setShowAddSuburb(true)} button detail={false}>
              <IonIcon icon={addOutline} slot="start" color="primary" />
              <IonLabel color="primary">Add New Suburb</IonLabel>
            </IonItem>
            {sortedSuburbs.map((suburb) => (
              <IonItem
                key={suburb.id}
                onClick={() => {
                  onSelect(suburb);
                  onDidDismiss();
                }}
                button
                detail={false}
              >
                <IonLabel>{suburb.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
      <AddSuburbModal
        isOpen={showAddSuburb}
        onDidDismiss={() => setShowAddSuburb(false)}
        onAdded={handleAdded}
      />
    </ResponsiveModal>
  );
}
