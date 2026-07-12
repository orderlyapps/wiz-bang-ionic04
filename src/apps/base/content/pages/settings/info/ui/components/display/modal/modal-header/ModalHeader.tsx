import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ModalHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/display" />
      </IonButtons>
      <IonTitle>Modal</IonTitle>
    </IonToolbar>
  );
}
