import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CongregationDetailHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/tables/congregation" />
      </IonButtons>
      <IonTitle>Congregation Details</IonTitle>
    </IonToolbar>
  );
}
