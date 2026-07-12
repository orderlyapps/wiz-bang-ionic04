import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function HooksHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util" />
      </IonButtons>
      <IonTitle>Hooks</IonTitle>
    </IonToolbar>
  );
}
