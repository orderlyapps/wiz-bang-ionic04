import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ReactQueryHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>TanStack Query</IonTitle>
    </IonToolbar>
  );
}
