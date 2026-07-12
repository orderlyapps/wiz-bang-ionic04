import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ToggleHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>Toggle</IonTitle>
    </IonToolbar>
  );
}
