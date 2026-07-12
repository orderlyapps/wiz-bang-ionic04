import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function OutlineManagementHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/super-admin" />
      </IonButtons>
      <IonTitle>Outlines</IonTitle>
    </IonToolbar>
  );
}
