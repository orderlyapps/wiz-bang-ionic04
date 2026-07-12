import { LayoutContent } from "@base-content/pages/settings/info/ui/components/layout/layout-content/LayoutContent";
import { LayoutHeader } from "@base-content/pages/settings/info/ui/components/layout/layout-header/LayoutHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function LayoutPage() {
  return (
    <IonPage>
      <IonHeader>
        <LayoutHeader />
      </IonHeader>
      <IonContent>
        <LayoutContent />
      </IonContent>
    </IonPage>
  );
}

export default LayoutPage;
