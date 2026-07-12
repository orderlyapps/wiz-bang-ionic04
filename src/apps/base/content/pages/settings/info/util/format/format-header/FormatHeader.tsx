import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function FormatHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util" />
      </IonButtons>
      <IonTitle>Format</IonTitle>
    </IonToolbar>
  );
}
