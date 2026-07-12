import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function SortHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util" />
      </IonButtons>
      <IonTitle>Sort</IonTitle>
    </IonToolbar>
  );
}
