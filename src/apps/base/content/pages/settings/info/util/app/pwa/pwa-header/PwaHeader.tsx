import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function PwaHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util/app" />
      </IonButtons>
      <IonTitle>PWA</IonTitle>
    </IonToolbar>
  );
}
