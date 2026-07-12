import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ComponentsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui" />
      </IonButtons>
      <IonTitle>Components</IonTitle>
    </IonToolbar>
  );
}
