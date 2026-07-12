import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function IonicHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util/vendor" />
      </IonButtons>
      <IonTitle>Ionic</IonTitle>
    </IonToolbar>
  );
}
