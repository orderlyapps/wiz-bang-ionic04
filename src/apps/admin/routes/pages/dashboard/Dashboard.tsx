import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function DashboardPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Admin Dashboard</h1>
        <p>This is a separate admin application.</p>
      </IonContent>
    </IonPage>
  );
}

export default DashboardPage;
