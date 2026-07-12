import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ClamDataHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/super-admin" />
      </IonButtons>
      <IonTitle>CLAM Data</IonTitle>
    </IonToolbar>
  );
}
