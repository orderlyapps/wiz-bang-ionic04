import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ButtonHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>Button</IonTitle>
    </IonToolbar>
  );
}
