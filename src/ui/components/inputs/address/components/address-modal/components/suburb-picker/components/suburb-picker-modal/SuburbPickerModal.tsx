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
import { AddSuburbModal } from "@ui/components/inputs/address/components/address-modal/components/suburb-picker/components/suburb-picker-modal/components/add-suburb-modal/AddSuburbModal";

type SuburbPickerModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSelect: (suburb: Suburb) => void;
};

export function SuburbPickerModal({ isOpen, onDidDismiss, onSelect }: SuburbPickerModalProps) {
  const [showAdd, setShowAdd] = useState(false);
  const { data: suburbs, isLoading } = useLiveQuery((q) => q.from({ suburb: suburbCollection }));

  const sorted = suburbs ? [...suburbs].sort((a, b) => a.name.localeCompare(b.name)) : [];

  function handleAdded(suburb: Suburb) {
    onSelect(suburb);
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
            <IonItem onClick={() => setShowAdd(true)} button detail={false}>
              <IonIcon icon={addOutline} slot="start" color="primary" />
              <IonLabel color="primary">Add New Suburb</IonLabel>
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
      <AddSuburbModal
        isOpen={showAdd}
        onDidDismiss={() => setShowAdd(false)}
        onAdded={handleAdded}
      />
    </ResponsiveModal>
  );
}
