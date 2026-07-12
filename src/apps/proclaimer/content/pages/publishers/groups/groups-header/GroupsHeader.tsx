import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function GroupsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/publishers" />
      </IonButtons>
      <IonTitle>Groups</IonTitle>
    </IonToolbar>
  );
}
