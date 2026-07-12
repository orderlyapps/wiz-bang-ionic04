import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

interface MapLogDetailHeaderProps {
  map_name: string;
}

export function MapLogDetailHeader({ map_name }: MapLogDetailHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/service-overseer/map-log" />
      </IonButtons>
      <IonTitle>{map_name}</IonTitle>
    </IonToolbar>
  );
}
