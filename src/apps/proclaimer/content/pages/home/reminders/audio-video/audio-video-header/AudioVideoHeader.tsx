import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function AudioVideoHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/reminders" />
      </IonButtons>
      <IonTitle>Audio Video</IonTitle>
    </IonToolbar>
  );
}
