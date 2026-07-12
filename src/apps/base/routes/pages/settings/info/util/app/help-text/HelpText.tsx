import { HelpTextContent } from "@base-content/pages/settings/info/util/app/help-text/help-text-content/HelpTextContent";
import { HelpTextHeader } from "@base-content/pages/settings/info/util/app/help-text/help-text-header/HelpTextHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function HelpTextPage() {
  return (
    <IonPage>
      <IonHeader>
        <HelpTextHeader />
      </IonHeader>
      <IonContent>
        <HelpTextContent />
      </IonContent>
    </IonPage>
  );
}

export default HelpTextPage;
