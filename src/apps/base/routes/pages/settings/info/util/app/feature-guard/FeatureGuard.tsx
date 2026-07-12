import { FeatureGuardContent } from "@base-content/pages/settings/info/util/app/feature-guard/feature-guard-content/FeatureGuardContent";
import { FeatureGuardHeader } from "@base-content/pages/settings/info/util/app/feature-guard/feature-guard-header/FeatureGuardHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function FeatureGuardPage() {
  return (
    <IonPage>
      <IonHeader>
        <FeatureGuardHeader />
      </IonHeader>
      <IonContent>
        <FeatureGuardContent />
      </IonContent>
    </IonPage>
  );
}

export default FeatureGuardPage;
