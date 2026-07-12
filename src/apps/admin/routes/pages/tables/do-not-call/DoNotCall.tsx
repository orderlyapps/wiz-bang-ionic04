import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function DoNotCallPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Do Not Call</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Do Not Call</h1>
      </IonContent>
    </IonPage>
  );
}

export default DoNotCallPage;
