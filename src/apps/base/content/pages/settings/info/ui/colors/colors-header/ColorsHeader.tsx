import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ColorsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui" />
      </IonButtons>
      <IonTitle>Colors</IonTitle>
    </IonToolbar>
  );
}
