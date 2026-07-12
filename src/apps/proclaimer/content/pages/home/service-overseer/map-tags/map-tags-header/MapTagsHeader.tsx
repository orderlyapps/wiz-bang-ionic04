import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function MapTagsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/service-overseer" />
      </IonButtons>
      <IonTitle>Map Tags</IonTitle>
    </IonToolbar>
  );
}
