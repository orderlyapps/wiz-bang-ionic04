import { IonToolbar, IonTitle, IonBackButton, IonButtons } from "@ionic/react";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { useHistory } from "react-router-dom";

export function EventsHeader() {
  const permissions = usePermissions();
  const history = useHistory();
  const can_edit =
    permissions.has_events || permissions.has_congregation_admin || permissions.is_super_admin;

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Events</IonTitle>
      {can_edit && (
        <IonButtons slot="end">
          <AddIconButton on_click={() => history.push("/home/events/edit")} />
        </IonButtons>
      )}
    </IonToolbar>
  );
}
