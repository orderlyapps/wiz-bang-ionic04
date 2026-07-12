import { IonToolbar, IonTitle, IonBackButton, IonButtons } from "@ionic/react";

export function AvOverseerHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>AV Overseer</IonTitle>
    </IonToolbar>
  );
}
