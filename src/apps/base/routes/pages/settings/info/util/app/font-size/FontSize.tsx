import { FontSizeContent } from "@base-content/pages/settings/info/util/app/font-size/font-size-content/FontSizeContent";
import { FontSizeHeader } from "@base-content/pages/settings/info/util/app/font-size/font-size-header/FontSizeHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function FontSizePage() {
  return (
    <IonPage>
      <IonHeader>
        <FontSizeHeader />
      </IonHeader>
      <IonContent>
        <FontSizeContent />
      </IonContent>
    </IonPage>
  );
}

export default FontSizePage;
