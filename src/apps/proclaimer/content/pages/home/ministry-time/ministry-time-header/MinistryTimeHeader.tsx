import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function MinistryTimeHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Ministry Time</IonTitle>
    </IonToolbar>
  );
}
