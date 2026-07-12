import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

interface WeekendAssignmentDetailHeaderProps {
  title: string;
  back_href: string;
}

export function WeekendAssignmentDetailHeader({
  title,
  back_href,
}: WeekendAssignmentDetailHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref={back_href} />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  );
}
