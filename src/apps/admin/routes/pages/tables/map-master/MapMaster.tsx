import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function MapMasterPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map Master</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Map Master</h1>
      </IonContent>
    </IonPage>
  );
}

export default MapMasterPage;
