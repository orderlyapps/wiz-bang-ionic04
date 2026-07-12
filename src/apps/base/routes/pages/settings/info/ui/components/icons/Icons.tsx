import { IconsContent } from "@base-content/pages/settings/info/ui/components/icons/icons-content/IconsContent";
import { IconsHeader } from "@base-content/pages/settings/info/ui/components/icons/icons-header/IconsHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function IconsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IconsHeader />
      </IonHeader>
      <IonContent>
        <IconsContent />
      </IonContent>
    </IonPage>
  );
}

export default IconsPage;
