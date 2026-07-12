import { AlertContent } from "@base-content/pages/settings/info/ui/components/display/alert/alert-content/AlertContent";
import { AlertHeader } from "@base-content/pages/settings/info/ui/components/display/alert/alert-header/AlertHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function AlertPage() {
  return (
    <IonPage>
      <IonHeader>
        <AlertHeader />
      </IonHeader>
      <IonContent>
        <AlertContent />
      </IonContent>
    </IonPage>
  );
}

export default AlertPage;
