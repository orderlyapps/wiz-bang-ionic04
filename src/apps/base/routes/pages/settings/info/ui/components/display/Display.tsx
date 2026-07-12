import { DisplayContent } from "@base-content/pages/settings/info/ui/components/display/display-content/DisplayContent";
import { DisplayHeader } from "@base-content/pages/settings/info/ui/components/display/display-header/DisplayHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function DisplayPage() {
  return (
    <IonPage>
      <IonHeader>
        <DisplayHeader />
      </IonHeader>
      <IonContent>
        <DisplayContent />
      </IonContent>
    </IonPage>
  );
}

export default DisplayPage;
