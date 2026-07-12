import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function TextHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/display" />
      </IonButtons>
      <IonTitle>Text</IonTitle>
    </IonToolbar>
  );
}
