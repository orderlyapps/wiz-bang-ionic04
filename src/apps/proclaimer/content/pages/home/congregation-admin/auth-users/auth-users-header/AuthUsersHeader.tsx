import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function AuthUsersHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Auth Users</IonTitle>
    </IonToolbar>
  );
}
