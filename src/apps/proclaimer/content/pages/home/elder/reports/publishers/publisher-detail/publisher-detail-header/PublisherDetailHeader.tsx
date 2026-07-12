import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

interface PublisherDetailHeaderProps {
  publisher_name: string;
}

export function PublisherDetailHeader({ publisher_name }: PublisherDetailHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/elder/reports/publishers" />
      </IonButtons>
      <IonTitle>{publisher_name}</IonTitle>
    </IonToolbar>
  );
}
