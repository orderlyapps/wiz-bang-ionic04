import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function DateTimeHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>Date Time</IonTitle>
    </IonToolbar>
  );
}
