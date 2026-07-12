import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function AppHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util" />
      </IonButtons>
      <IonTitle>App</IonTitle>
    </IonToolbar>
  );
}
