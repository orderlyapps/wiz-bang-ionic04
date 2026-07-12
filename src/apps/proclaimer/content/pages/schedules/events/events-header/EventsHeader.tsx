import { IonToolbar, IonTitle, IonBackButton, IonButtons } from "@ionic/react";

export function EventsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Events</IonTitle>
    </IonToolbar>
  );
}
