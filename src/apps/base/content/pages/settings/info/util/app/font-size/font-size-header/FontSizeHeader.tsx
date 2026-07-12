import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function FontSizeHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util/app" />
      </IonButtons>
      <IonTitle>Font Size</IonTitle>
    </IonToolbar>
  );
}
