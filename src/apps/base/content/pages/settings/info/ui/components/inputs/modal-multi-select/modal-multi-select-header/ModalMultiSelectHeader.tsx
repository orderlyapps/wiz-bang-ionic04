import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ModalMultiSelectHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>Modal Multi Select</IonTitle>
    </IonToolbar>
  );
}
