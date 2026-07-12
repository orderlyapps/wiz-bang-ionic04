import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function UiHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info" />
      </IonButtons>
      <IonTitle>UI</IonTitle>
    </IonToolbar>
  );
}
