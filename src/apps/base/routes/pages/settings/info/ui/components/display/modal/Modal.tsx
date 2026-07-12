import { ModalContent } from "@base-content/pages/settings/info/ui/components/display/modal/modal-content/ModalContent";
import { ModalHeader } from "@base-content/pages/settings/info/ui/components/display/modal/modal-header/ModalHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function ModalPage() {
  return (
    <IonPage>
      <IonHeader>
        <ModalHeader />
      </IonHeader>
      <IonContent>
        <ModalContent />
      </IonContent>
    </IonPage>
  );
}

export default ModalPage;
