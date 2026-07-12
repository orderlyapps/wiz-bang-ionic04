import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function AudioVideoHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/elder" />
      </IonButtons>
      <IonTitle>Audio Video</IonTitle>
    </IonToolbar>
  );
}
