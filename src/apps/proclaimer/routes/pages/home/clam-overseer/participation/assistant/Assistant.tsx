import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AssistantHeader } from "@proclaimer-content/pages/home/clam-overseer/participation/assistant/assistant-header/AssistantHeader";
import { AssistantContent } from "@proclaimer-content/pages/home/clam-overseer/participation/assistant/assistant-content/AssistantContent";

function AssistantPage() {
  return (
    <IonPage>
      <IonHeader>
        <AssistantHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <AssistantContent />
      </IonContent>
    </IonPage>
  );
}

export default AssistantPage;
