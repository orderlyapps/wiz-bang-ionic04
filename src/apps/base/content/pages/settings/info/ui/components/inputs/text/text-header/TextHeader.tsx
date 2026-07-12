import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function TextHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>Text</IonTitle>
    </IonToolbar>
  );
}
