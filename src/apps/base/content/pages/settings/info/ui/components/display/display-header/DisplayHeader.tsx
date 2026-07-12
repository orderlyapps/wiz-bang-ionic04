import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function DisplayHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components" />
      </IonButtons>
      <IonTitle>Display</IonTitle>
    </IonToolbar>
  );
}
