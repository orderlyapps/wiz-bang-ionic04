import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

interface EditEventHeaderProps {
  is_new: boolean;
}

export function EditEventHeader({ is_new }: EditEventHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/events" />
      </IonButtons>
      <IonTitle>{is_new ? "New Event" : "Edit Event"}</IonTitle>
    </IonToolbar>
  );
}
