import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function TerritoryServantHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Territory Servant</IonTitle>
    </IonToolbar>
  );
}
