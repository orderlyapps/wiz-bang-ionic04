import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function LocalSpeakersHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Local Speakers</IonTitle>
    </IonToolbar>
  );
}
