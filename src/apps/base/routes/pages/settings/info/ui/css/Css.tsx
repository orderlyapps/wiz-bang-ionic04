import { CssContent } from "@base-content/pages/settings/info/ui/css/css-content/CssContent";
import { CssHeader } from "@base-content/pages/settings/info/ui/css/css-header/CssHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function CssPage() {
  return (
    <IonPage>
      <IonHeader>
        <CssHeader />
      </IonHeader>
      <IonContent>
        <CssContent />
      </IonContent>
    </IonPage>
  );
}

export default CssPage;
