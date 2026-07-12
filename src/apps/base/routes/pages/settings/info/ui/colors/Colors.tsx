import { ColorsContent } from "@base-content/pages/settings/info/ui/colors/colors-content/ColorsContent";
import { ColorsHeader } from "@base-content/pages/settings/info/ui/colors/colors-header/ColorsHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function ColorsPage() {
  return (
    <IonPage>
      <IonHeader>
        <ColorsHeader />
      </IonHeader>
      <IonContent>
        <ColorsContent />
      </IonContent>
    </IonPage>
  );
}

export default ColorsPage;
