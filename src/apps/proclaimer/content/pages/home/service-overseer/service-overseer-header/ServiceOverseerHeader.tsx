import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ServiceOverseerHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Service Overseer</IonTitle>
    </IonToolbar>
  );
}
