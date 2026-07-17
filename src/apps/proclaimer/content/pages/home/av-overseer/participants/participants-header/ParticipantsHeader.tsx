import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ParticipantsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/av-overseer" />
      </IonButtons>
      <IonTitle>Participants</IonTitle>
    </IonToolbar>
  );
}
