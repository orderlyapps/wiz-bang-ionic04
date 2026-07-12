import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function AvParticipationHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/av-overseer" />
      </IonButtons>
      <IonTitle>Participation</IonTitle>
    </IonToolbar>
  );
}
