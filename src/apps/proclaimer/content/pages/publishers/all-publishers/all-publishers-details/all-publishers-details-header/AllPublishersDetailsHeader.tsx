import { IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonIcon } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { createOutline, checkmarkOutline } from "ionicons/icons";

export function AllPublishersDetailsHeader({
  publisher_id,
  read_only,
  onToggleEdit,
}: {
  publisher_id: string;
  read_only: boolean;
  onToggleEdit: () => void;
}) {
  const { has_secretary, has_congregation_admin, is_super_admin } = usePermissions();
  const can_edit = has_secretary || has_congregation_admin || is_super_admin;

  const { data } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisher_id)),
  );

  const publisher = data?.[0];

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/publishers/all" />
      </IonButtons>
      <IonTitle>{publisher ? getPublisherDisplayName(publisher) : "Publisher"}</IonTitle>
      {can_edit && (
        <IonButtons slot="end">
          <IonButton onClick={onToggleEdit}>
            <IonIcon
              slot="icon-only"
              icon={read_only ? createOutline : checkmarkOutline}
              aria-label={read_only ? "Edit" : "Done"}
            />
          </IonButton>
        </IonButtons>
      )}
    </IonToolbar>
  );
}
