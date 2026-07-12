import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function MapboxHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util/vendor" />
      </IonButtons>
      <IonTitle>Mapbox</IonTitle>
    </IonToolbar>
  );
}
