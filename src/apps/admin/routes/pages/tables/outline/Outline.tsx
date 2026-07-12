import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function OutlinePage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Outline</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Outline</h1>
      </IonContent>
    </IonPage>
  );
}

export default OutlinePage;
