import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function InputsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components" />
      </IonButtons>
      <IonTitle>Inputs</IonTitle>
    </IonToolbar>
  );
}
