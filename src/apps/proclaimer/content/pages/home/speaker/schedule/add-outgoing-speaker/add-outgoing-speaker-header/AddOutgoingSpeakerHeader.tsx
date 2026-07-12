import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

interface AddOutgoingSpeakerHeaderProps {
  back_href: string;
}

export function AddOutgoingSpeakerHeader({ back_href }: AddOutgoingSpeakerHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref={back_href} />
      </IonButtons>
      <IonTitle>Add Outgoing Speaker</IonTitle>
    </IonToolbar>
  );
}
