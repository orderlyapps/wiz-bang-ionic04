import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { BulkEntryIconButton } from "@ui/components/inputs/button/icon/bulk-entry/BulkEntryIconButton";

export function MapLogHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/service-overseer" />
      </IonButtons>
      <IonTitle>Map Log</IonTitle>
      <IonButtons slot="end">
        <BulkEntryIconButton routerLink="/home/service-overseer/map-log/bulk-entry" />
      </IonButtons>
    </IonToolbar>
  );
}
