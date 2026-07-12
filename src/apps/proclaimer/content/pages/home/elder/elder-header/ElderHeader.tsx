import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ElderHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Elder</IonTitle>
    </IonToolbar>
  );
}
