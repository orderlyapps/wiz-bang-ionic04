import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function MapsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Maps</IonTitle>
    </IonToolbar>
  );
}
