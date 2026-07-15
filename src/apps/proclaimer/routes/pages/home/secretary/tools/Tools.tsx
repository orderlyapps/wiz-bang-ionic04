import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ToolsHeader } from "@proclaimer-content/pages/home/secretary/tools/tools-header/ToolsHeader";
import { ToolsContent } from "@proclaimer-content/pages/home/secretary/tools/tools-content/ToolsContent";

function ToolsPage() {
  return (
    <IonPage>
      <IonHeader>
        <ToolsHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <ToolsContent />
      </IonContent>
    </IonPage>
  );
}

export default ToolsPage;
