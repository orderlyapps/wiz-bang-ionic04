import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function InfoHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings" />
      </IonButtons>
      <IonTitle>Info</IonTitle>
    </IonToolbar>
  );
}
