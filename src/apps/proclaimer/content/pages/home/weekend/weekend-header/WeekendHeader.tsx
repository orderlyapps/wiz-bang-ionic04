import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function WeekendHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Weekend</IonTitle>
    </IonToolbar>
  );
}
