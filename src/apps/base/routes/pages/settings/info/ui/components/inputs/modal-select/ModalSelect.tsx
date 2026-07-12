import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ModalSelectHeader } from "@base-content/pages/settings/info/ui/components/inputs/modal-select/modal-select-header/ModalSelectHeader";
import { ModalSelectContent } from "@base-content/pages/settings/info/ui/components/inputs/modal-select/modal-select-content/ModalSelectContent";

function ModalSelectPage() {
  return (
    <IonPage>
      <IonHeader>
        <ModalSelectHeader />
      </IonHeader>
      <IonContent>
        <ModalSelectContent />
      </IonContent>
    </IonPage>
  );
}

export default ModalSelectPage;
