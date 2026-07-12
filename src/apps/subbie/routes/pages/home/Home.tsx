import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function HomePage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Subbie</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Welcome to Subbie</h1>
      </IonContent>
    </IonPage>
  );
}

export default HomePage;
