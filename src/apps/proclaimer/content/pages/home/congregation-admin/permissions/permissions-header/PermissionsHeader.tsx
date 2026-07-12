import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function PermissionsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Permissions</IonTitle>
    </IonToolbar>
  );
}
