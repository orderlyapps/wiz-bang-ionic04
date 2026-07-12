import { ConstantsContent } from "@base-content/pages/settings/info/util/constants/constants-content/ConstantsContent";
import { ConstantsHeader } from "@base-content/pages/settings/info/util/constants/constants-header/ConstantsHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function ConstantsPage() {
  return (
    <IonPage>
      <IonHeader>
        <ConstantsHeader />
      </IonHeader>
      <IonContent>
        <ConstantsContent />
      </IonContent>
    </IonPage>
  );
}

export default ConstantsPage;
