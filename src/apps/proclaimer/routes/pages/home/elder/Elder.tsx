import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ElderHeader } from "@proclaimer-content/pages/home/elder/elder-header/ElderHeader";
import { ElderContent } from "@proclaimer-content/pages/home/elder/elder-content/ElderContent";

function ElderPage() {
  return (
    <IonPage>
      <IonHeader>
        <ElderHeader />
      </IonHeader>
      <IonContent>
        <ElderContent />
      </IonContent>
    </IonPage>
  );
}

export default ElderPage;
