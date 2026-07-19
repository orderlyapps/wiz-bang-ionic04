import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

interface AssignmentsHeaderProps {
  publisher_name: string;
  default_href?: string;
}

export function AssignmentsHeader({
  publisher_name,
  default_href = "/publishers/all",
}: AssignmentsHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref={default_href} />
      </IonButtons>
      <IonTitle>{publisher_name}</IonTitle>
    </IonToolbar>
  );
}
