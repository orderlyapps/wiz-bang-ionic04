import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function AlertHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/display" />
      </IonButtons>
      <IonTitle>Alert</IonTitle>
    </IonToolbar>
  );
}
