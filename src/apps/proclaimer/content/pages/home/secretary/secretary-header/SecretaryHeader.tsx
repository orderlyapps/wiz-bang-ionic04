import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function SecretaryHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Secretary</IonTitle>
    </IonToolbar>
  );
}
