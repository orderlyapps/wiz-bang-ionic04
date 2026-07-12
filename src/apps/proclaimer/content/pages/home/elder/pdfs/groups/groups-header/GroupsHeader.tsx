import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function GroupsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/elder/pdfs" />
      </IonButtons>
      <IonTitle>Groups</IonTitle>
    </IonToolbar>
  );
}
