import { HooksContent } from "@base-content/pages/settings/info/util/hooks/hooks-content/HooksContent";
import { HooksHeader } from "@base-content/pages/settings/info/util/hooks/hooks-header/HooksHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function HooksPage() {
  return (
    <IonPage>
      <IonHeader>
        <HooksHeader />
      </IonHeader>
      <IonContent>
        <HooksContent />
      </IonContent>
    </IonPage>
  );
}

export default HooksPage;
