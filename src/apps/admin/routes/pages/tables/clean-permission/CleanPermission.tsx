import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function CleanPermissionPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clean Permission</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Clean Permission</h1>
      </IonContent>
    </IonPage>
  );
}

export default CleanPermissionPage;
