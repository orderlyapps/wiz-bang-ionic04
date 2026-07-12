import { AppContent } from "@base-content/pages/settings/info/util/app/app-content/AppContent";
import { AppHeader } from "@base-content/pages/settings/info/util/app/app-header/AppHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function AppPage() {
  return (
    <IonPage>
      <IonHeader>
        <AppHeader />
      </IonHeader>
      <IonContent>
        <AppContent />
      </IonContent>
    </IonPage>
  );
}

export default AppPage;
