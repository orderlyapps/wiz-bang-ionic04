import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ParticipationHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/weekend" />
      </IonButtons>
      <IonTitle>Participation</IonTitle>
    </IonToolbar>
  );
}
