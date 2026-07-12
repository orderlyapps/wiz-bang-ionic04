import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function GroupPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Group</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Group</h1>
      </IonContent>
    </IonPage>
  );
}

export default GroupPage;
