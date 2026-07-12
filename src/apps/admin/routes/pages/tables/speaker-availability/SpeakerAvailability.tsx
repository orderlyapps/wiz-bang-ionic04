import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function SpeakerAvailabilityPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Speaker Availability</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Speaker Availability</h1>
      </IonContent>
    </IonPage>
  );
}

export default SpeakerAvailabilityPage;
