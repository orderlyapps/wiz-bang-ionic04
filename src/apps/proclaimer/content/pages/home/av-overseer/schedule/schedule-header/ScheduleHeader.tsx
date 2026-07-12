import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function AvScheduleHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>AV Schedule</IonTitle>
    </IonToolbar>
  );
}
