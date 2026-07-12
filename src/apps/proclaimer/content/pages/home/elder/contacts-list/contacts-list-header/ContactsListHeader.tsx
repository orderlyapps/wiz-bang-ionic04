import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ContactsListHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/elder/pdfs" />
      </IonButtons>
      <IonTitle>Contacts List</IonTitle>
    </IonToolbar>
  );
}
