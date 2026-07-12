import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function BulkEntryHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/service-overseer/map-log" />
      </IonButtons>
      <IonTitle>Bulk Entry</IonTitle>
    </IonToolbar>
  );
}
