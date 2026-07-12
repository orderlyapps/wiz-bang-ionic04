import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function CleanMajorPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clean Major</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Clean Major</h1>
      </IonContent>
    </IonPage>
  );
}

export default CleanMajorPage;
