import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function VendorHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util" />
      </IonButtons>
      <IonTitle>Vendor</IonTitle>
    </IonToolbar>
  );
}
