import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

interface EditTalkHeaderProps {
  title: string;
  back_href: string;
}

export function EditTalkHeader({ title, back_href }: EditTalkHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref={back_href} />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  );
}
