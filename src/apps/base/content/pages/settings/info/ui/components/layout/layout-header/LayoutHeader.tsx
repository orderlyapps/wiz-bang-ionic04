import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function LayoutHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components" />
      </IonButtons>
      <IonTitle>Layout</IonTitle>
    </IonToolbar>
  );
}
