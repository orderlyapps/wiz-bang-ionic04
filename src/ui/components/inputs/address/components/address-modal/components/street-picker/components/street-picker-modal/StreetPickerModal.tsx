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
import type { SuburbRef } from "../../../../../../types";
import { AddStreetModal } from "@ui/components/inputs/address/components/address-modal/components/street-picker/components/street-picker-modal/components/add-street-modal/AddStreetModal";

type StreetPickerModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSelect: (street: Street) => void;
  suburbId?: string;
  suburb?: SuburbRef;
};

export function StreetPickerModal({
  isOpen,
  onDidDismiss,
  onSelect,
  suburbId,
  suburb,
}: StreetPickerModalProps) {
  const [showAdd, setShowAdd] = useState(false);
  const { data: streets, isLoading } = useLiveQuery(
    (q) => {
      if (!suburbId) return undefined;
      return q
        .from({ street: streetCollection })
        .where(({ street }) => eq(street.suburb_id, suburbId));
    },
    [suburbId],
  );

  const sorted = streets ? [...streets].sort((a, b) => a.name.localeCompare(b.name)) : [];

  function handleAdded(street: Street) {
    onSelect(street);
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
            <IonItem onClick={() => setShowAdd(true)} button detail={false}>
              <IonIcon icon={addOutline} slot="start" color="primary" />
              <IonLabel color="primary">Add New Street</IonLabel>
            </IonItem>
            {sorted.map((s) => (
              <IonItem
                key={s.id}
                onClick={() => {
                  onSelect(s);
                  onDidDismiss();
                }}
                button
                detail={false}
              >
                <IonLabel>{s.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
      <AddStreetModal
        isOpen={showAdd}
        onDidDismiss={() => setShowAdd(false)}
        onAdded={handleAdded}
        suburb={suburb}
      />
    </ResponsiveModal>
  );
}
