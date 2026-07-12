import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function EventPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Event</h1>
      </IonContent>
    </IonPage>
  );
}

export default EventPage;
