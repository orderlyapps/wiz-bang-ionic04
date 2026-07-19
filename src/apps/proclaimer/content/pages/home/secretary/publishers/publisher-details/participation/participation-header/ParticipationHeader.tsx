import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ParticipationHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/publishers/all" />
      </IonButtons>
      <IonTitle>Participation</IonTitle>
    </IonToolbar>
  );
}
