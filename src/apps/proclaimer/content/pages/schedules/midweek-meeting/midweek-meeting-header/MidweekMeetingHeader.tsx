import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function MidweekMeetingHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Midweek Meeting</IonTitle>
    </IonToolbar>
  );
}
