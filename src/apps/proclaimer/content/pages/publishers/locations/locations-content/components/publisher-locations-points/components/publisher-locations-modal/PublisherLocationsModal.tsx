import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import type { AddressPublisherGroup } from "../../hooks/useGroupedPublisherLocations";

type PublisherLocationsModalProps = {
  group: AddressPublisherGroup | null;
  onDismiss: () => void;
};

export function PublisherLocationsModal({ group, onDismiss }: PublisherLocationsModalProps) {
  const { has_elder, has_congregation_admin, is_super_admin } = usePermissions();
  const can_view_details = has_elder || has_congregation_admin || is_super_admin;
  return (
    <ResponsiveModal isOpen={group !== null} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publishers</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={onDismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {group?.publishers.map((publisher) => (
            <IonItem
              key={publisher.publisher_id}
              button={can_view_details}
              routerLink={
                can_view_details ? `/publishers/all/${publisher.publisher_id}` : undefined
              }
              onClick={can_view_details ? onDismiss : undefined}
            >
              <IonLabel>{getPublisherDisplayName(publisher)}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
