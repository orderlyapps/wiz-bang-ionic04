import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CongregationHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/tables" />
      </IonButtons>
      <IonTitle>Congregation</IonTitle>
    </IonToolbar>
  );
}
