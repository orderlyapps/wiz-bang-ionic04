import { IonToolbar, IonTitle, IonBackButton, IonButtons } from "@ionic/react";

export function SpeakerHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Speaker</IonTitle>
    </IonToolbar>
  );
}
