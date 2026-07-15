import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

interface PublisherDetailHeaderProps {
  publisher_name: string;
  default_href?: string;
}

export function PublisherDetailHeader({
  publisher_name,
  default_href = "/home/elder/reports/publishers",
}: PublisherDetailHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref={default_href} />
      </IonButtons>
      <IonTitle>{publisher_name}</IonTitle>
    </IonToolbar>
  );
}
