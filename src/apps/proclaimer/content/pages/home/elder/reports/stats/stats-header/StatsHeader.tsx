import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function StatsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/elder/reports" />
      </IonButtons>
      <IonTitle>Stats</IonTitle>
    </IonToolbar>
  );
}
