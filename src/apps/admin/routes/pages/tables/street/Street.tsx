import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function StreetPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Street</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Street</h1>
      </IonContent>
    </IonPage>
  );
}

export default StreetPage;
