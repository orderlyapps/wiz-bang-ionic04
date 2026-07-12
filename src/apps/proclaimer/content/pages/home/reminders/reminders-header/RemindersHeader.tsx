import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function RemindersHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Reminders</IonTitle>
    </IonToolbar>
  );
}
