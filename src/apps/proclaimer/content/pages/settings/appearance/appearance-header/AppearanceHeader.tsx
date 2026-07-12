import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function AppearanceHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings" />
      </IonButtons>
      <IonTitle>Appearance</IonTitle>
    </IonToolbar>
  );
}
