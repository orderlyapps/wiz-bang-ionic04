import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { LivingHeader } from "@proclaimer-content/pages/home/clam-overseer/participation/living/living-header/LivingHeader";
import { LivingContent } from "@proclaimer-content/pages/home/clam-overseer/participation/living/living-content/LivingContent";

function LivingPage() {
  return (
    <IonPage>
      <IonHeader>
        <LivingHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <LivingContent />
      </IonContent>
    </IonPage>
  );
}

export default LivingPage;
