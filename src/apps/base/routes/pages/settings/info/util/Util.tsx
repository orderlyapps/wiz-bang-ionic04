import { UtilContent } from "@base-content/pages/settings/info/util/util-content/UtilContent";
import { UtilHeader } from "@base-content/pages/settings/info/util/util-header/UtilHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function UtilPage() {
  return (
    <IonPage>
      <IonHeader>
        <UtilHeader />
      </IonHeader>
      <IonContent>
        <UtilContent />
      </IonContent>
    </IonPage>
  );
}

export default UtilPage;
