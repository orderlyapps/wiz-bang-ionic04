import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";

interface Permission {
  $key: string;
  auth_user_id: string;
  congregation_id: string;
  can_edit: boolean;
}

interface GenericPermissionModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  permissions: Permission[] | undefined;
  on_add_permission: (publisher: Publisher) => void;
  modal_title: string;
  gender_filter?: "male" | "female" | "both";
}

export function GenericPermissionModal({
  is_open,
  on_dismiss,
  permissions,
  on_add_permission,
  modal_title,
  gender_filter = "male",
}: GenericPermissionModalProps) {
  const congregation_id = getStoredCongregation()?.id;

  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const full_permission_auth_ids = new Set(
    (permissions ?? [])
      .filter((p) => (!congregation_id || p.congregation_id === congregation_id) && p.can_edit)
      .map((p) => p.auth_user_id),
  );

  const available_publishers = (publishers ?? []).filter(
    (p) =>
      p.congregation_id === congregation_id &&
      p.auth_id &&
      (gender_filter === "both" || p.gender === gender_filter) &&
      !full_permission_auth_ids.has(p.auth_id),
  );

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{modal_title}</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {available_publishers.length === 0 ? (
            <IonItem>
              <IonLabel>No available publishers found.</IonLabel>
            </IonItem>
          ) : (
            available_publishers.map((publisher) => (
              <IonItem key={publisher.id} button onClick={() => on_add_permission(publisher)}>
                <IonLabel>{getPublisherDisplayName(publisher)}</IonLabel>
              </IonItem>
            ))
          )}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
