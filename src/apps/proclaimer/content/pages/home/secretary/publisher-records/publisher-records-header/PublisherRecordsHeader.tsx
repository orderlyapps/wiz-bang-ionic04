import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function PublisherRecordsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/secretary" />
      </IonButtons>
      <IonTitle>Publisher Records</IonTitle>
    </IonToolbar>
  );
}
