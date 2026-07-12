import { IonToolbar, IonTitle, IonBackButton, IonButtons } from "@ionic/react";

export function AssignmentsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Assignments</IonTitle>
    </IonToolbar>
  );
}
