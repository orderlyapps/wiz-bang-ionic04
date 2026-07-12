import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function NumberHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>Number</IonTitle>
    </IonToolbar>
  );
}
