import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function CleanMinorPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clean Minor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Clean Minor</h1>
      </IonContent>
    </IonPage>
  );
}

export default CleanMinorPage;
