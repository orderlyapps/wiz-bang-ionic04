import { UiContent } from "@base-content/pages/settings/info/ui/ui-content/UiContent";
import { UiHeader } from "@base-content/pages/settings/info/ui/ui-header/UiHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function UiPage() {
  return (
    <IonPage>
      <IonHeader>
        <UiHeader />
      </IonHeader>
      <IonContent>
        <UiContent />
      </IonContent>
    </IonPage>
  );
}

export default UiPage;
