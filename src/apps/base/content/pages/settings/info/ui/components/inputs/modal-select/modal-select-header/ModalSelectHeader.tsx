import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ModalSelectHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>Modal Select</IonTitle>
    </IonToolbar>
  );
}
