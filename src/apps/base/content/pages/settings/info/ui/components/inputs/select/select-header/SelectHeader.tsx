import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function SelectHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>Select</IonTitle>
    </IonToolbar>
  );
}
