import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CongregationAdminHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Congregation Admin</IonTitle>
    </IonToolbar>
  );
}
