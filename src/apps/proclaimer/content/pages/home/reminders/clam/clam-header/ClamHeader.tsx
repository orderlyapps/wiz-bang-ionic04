import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ClamHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>CLAM</IonTitle>
    </IonToolbar>
  );
}
