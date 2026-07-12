import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function SuperAdminHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Super Admin</IonTitle>
    </IonToolbar>
  );
}
