import { VendorContent } from "@base-content/pages/settings/info/util/vendor/vendor-content/VendorContent";
import { VendorHeader } from "@base-content/pages/settings/info/util/vendor/vendor-header/VendorHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function VendorPage() {
  return (
    <IonPage>
      <IonHeader>
        <VendorHeader />
      </IonHeader>
      <IonContent>
        <VendorContent />
      </IonContent>
    </IonPage>
  );
}

export default VendorPage;
