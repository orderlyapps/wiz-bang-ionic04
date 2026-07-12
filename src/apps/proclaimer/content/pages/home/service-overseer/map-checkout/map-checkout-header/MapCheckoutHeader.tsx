import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function MapCheckoutHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/service-overseer" />
      </IonButtons>
      <IonTitle>Map Checkout</IonTitle>
    </IonToolbar>
  );
}
