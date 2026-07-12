import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ClamOverseerHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>CLAM Overseer</IonTitle>
    </IonToolbar>
  );
}
