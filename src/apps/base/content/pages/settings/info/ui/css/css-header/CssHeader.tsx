import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CssHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui" />
      </IonButtons>
      <IonTitle>CSS</IonTitle>
    </IonToolbar>
  );
}
