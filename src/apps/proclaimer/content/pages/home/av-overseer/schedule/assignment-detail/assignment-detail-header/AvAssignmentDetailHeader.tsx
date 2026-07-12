import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

interface AvAssignmentDetailHeaderProps {
  title: string;
  back_href: string;
}

export function AvAssignmentDetailHeader({ title, back_href }: AvAssignmentDetailHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref={back_href} />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  );
}
