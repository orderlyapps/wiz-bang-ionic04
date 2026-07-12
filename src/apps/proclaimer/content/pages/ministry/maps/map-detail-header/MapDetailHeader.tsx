import { IonBackButton, IonButtons, IonTitle, IonToolbar } from "@ionic/react";

interface Props {
  map_id: string;
}

export function MapDetailHeader({ map_id }: Props) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/ministry/maps" />
      </IonButtons>
      <IonTitle>Map {map_id}</IonTitle>
    </IonToolbar>
  );
}
