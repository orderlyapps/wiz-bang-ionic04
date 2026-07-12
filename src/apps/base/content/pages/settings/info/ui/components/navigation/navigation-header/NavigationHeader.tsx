import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function NavigationHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components" />
      </IonButtons>
      <IonTitle>Navigation</IonTitle>
    </IonToolbar>
  );
}
