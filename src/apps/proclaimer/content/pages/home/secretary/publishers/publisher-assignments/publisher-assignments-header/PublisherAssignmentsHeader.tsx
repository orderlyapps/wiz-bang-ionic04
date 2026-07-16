import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

interface PublisherAssignmentsHeaderProps {
  publisher_name: string;
  default_href?: string;
}

export function PublisherAssignmentsHeader({
  publisher_name,
  default_href = "/publishers/all",
}: PublisherAssignmentsHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref={default_href} />
      </IonButtons>
      <IonTitle>{publisher_name}</IonTitle>
    </IonToolbar>
  );
}
