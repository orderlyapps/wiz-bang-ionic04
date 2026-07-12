import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ConstantsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util" />
      </IonButtons>
      <IonTitle>Constants</IonTitle>
    </IonToolbar>
  );
}
