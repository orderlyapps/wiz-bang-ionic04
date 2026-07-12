import { ComponentsContent } from "@base-content/pages/settings/info/ui/components/components-content/ComponentsContent";
import { ComponentsHeader } from "@base-content/pages/settings/info/ui/components/components-header/ComponentsHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function ComponentsPage() {
  return (
    <IonPage>
      <IonHeader>
        <ComponentsHeader />
      </IonHeader>
      <IonContent>
        <ComponentsContent />
      </IonContent>
    </IonPage>
  );
}

export default ComponentsPage;
