import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function VisitingSpeakersHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Visiting Speakers</IonTitle>
    </IonToolbar>
  );
}
