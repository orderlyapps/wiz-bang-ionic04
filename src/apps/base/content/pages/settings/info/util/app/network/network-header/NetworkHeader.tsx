import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function NetworkHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util/app" />
      </IonButtons>
      <IonTitle>Network</IonTitle>
    </IonToolbar>
  );
}
