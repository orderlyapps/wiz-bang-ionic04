import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function MapPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Map</h1>
      </IonContent>
    </IonPage>
  );
}

export default MapPage;
