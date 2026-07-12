import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function AuthUserPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Auth User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Auth User</h1>
      </IonContent>
    </IonPage>
  );
}

export default AuthUserPage;
