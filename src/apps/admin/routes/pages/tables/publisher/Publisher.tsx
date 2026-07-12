import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function PublisherPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publisher</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Publisher</h1>
      </IonContent>
    </IonPage>
  );
}

export default PublisherPage;
