import { AppearanceContent } from "@admin-content/pages/settings/appearance/appearance-content/AppearanceContent";
import { AppearanceHeader } from "@admin-content/pages/settings/appearance/appearance-header/AppearanceHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function AppearancePage() {
  return (
    <IonPage>
      <IonHeader>
        <AppearanceHeader />
      </IonHeader>
      <IonContent>
        <AppearanceContent />
      </IonContent>
    </IonPage>
  );
}

export default AppearancePage;
