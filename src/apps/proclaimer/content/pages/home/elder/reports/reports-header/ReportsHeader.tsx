import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ReportsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/elder" />
      </IonButtons>
      <IonTitle>Reports</IonTitle>
    </IonToolbar>
  );
}
