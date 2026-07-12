import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ScheduleHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Schedule</IonTitle>
    </IonToolbar>
  );
}
