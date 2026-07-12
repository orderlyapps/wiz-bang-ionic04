import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CleaningScheduleHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/elder" />
      </IonButtons>
      <IonTitle>Cleaning Schedule</IonTitle>
    </IonToolbar>
  );
}
