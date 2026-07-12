import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

interface MapTagDetailHeaderProps {
  tag_name: string;
}

export function MapTagDetailHeader({ tag_name }: MapTagDetailHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/service-overseer/map-tags" />
      </IonButtons>
      <IonTitle>{tag_name}</IonTitle>
    </IonToolbar>
  );
}
