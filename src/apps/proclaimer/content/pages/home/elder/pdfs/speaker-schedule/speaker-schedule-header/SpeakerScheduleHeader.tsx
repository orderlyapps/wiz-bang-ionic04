import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function SpeakerScheduleHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/elder/pdfs" />
      </IonButtons>
      <IonTitle>Speaker Schedule</IonTitle>
    </IonToolbar>
  );
}
