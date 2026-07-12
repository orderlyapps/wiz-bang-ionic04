import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function NotAtHomePage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Not At Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Not At Home</h1>
      </IonContent>
    </IonPage>
  );
}

export default NotAtHomePage;
