import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CobeHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>COBE</IonTitle>
    </IonToolbar>
  );
}
