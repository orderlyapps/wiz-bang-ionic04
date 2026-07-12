import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ProfileHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings" />
      </IonButtons>
      <IonTitle>Profile</IonTitle>
    </IonToolbar>
  );
}
