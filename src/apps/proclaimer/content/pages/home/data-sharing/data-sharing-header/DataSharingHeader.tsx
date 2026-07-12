import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function DataSharingHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home" />
      </IonButtons>
      <IonTitle>Data Sharing</IonTitle>
    </IonToolbar>
  );
}
