import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

type PublisherListHeaderProps = {
  title: string;
};

export function PublisherListHeader({ title }: PublisherListHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/publishers" />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  );
}
