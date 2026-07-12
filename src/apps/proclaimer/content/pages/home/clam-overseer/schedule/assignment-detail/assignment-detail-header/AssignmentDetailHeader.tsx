import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

interface AssignmentDetailHeaderProps {
  title: string;
  back_href: string;
}

export function AssignmentDetailHeader({ title, back_href }: AssignmentDetailHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref={back_href} />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  );
}
