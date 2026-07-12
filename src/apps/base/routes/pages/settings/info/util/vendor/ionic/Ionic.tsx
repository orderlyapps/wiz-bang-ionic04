import { IonicContent } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/IonicContent";
import { IonicHeader } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-header/IonicHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function IonicPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonicHeader />
      </IonHeader>
      <IonContent>
        <IonicContent />
      </IonContent>
    </IonPage>
  );
}

export default IonicPage;
