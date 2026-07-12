import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function AuthHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util/app" />
      </IonButtons>
      <IonTitle>Auth</IonTitle>
    </IonToolbar>
  );
}
