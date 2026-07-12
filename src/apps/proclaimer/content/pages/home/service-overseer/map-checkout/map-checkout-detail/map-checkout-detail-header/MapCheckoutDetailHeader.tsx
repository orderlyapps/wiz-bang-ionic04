import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

interface MapCheckoutDetailHeaderProps {
  publisher_name: string;
}

export function MapCheckoutDetailHeader({ publisher_name }: MapCheckoutDetailHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/service-overseer/map-checkout" />
      </IonButtons>
      <IonTitle>{publisher_name}</IonTitle>
    </IonToolbar>
  );
}
