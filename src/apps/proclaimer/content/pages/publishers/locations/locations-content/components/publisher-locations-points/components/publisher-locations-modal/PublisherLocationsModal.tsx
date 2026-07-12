import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { AddressPublisherGroup } from "../../hooks/useGroupedPublisherLocations";

type PublisherLocationsModalProps = {
  group: AddressPublisherGroup | null;
  onDismiss: () => void;
};

export function PublisherLocationsModal({ group, onDismiss }: PublisherLocationsModalProps) {
  return (
    <ResponsiveModal isOpen={group !== null} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publishers</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {group?.publishers.map((publisher) => (
            <IonItem key={publisher.publisher_id}>
              <IonLabel>{getPublisherDisplayName(publisher)}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
