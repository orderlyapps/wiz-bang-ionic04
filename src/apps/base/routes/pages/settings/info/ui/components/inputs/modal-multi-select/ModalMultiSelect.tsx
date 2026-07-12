import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ModalMultiSelectHeader } from "@base-content/pages/settings/info/ui/components/inputs/modal-multi-select/modal-multi-select-header/ModalMultiSelectHeader";
import { ModalMultiSelectContent } from "@base-content/pages/settings/info/ui/components/inputs/modal-multi-select/modal-multi-select-content/ModalMultiSelectContent";

function ModalMultiSelectPage() {
  return (
    <IonPage>
      <IonHeader>
        <ModalMultiSelectHeader />
      </IonHeader>
      <IonContent>
        <ModalMultiSelectContent />
      </IonContent>
    </IonPage>
  );
}

export default ModalMultiSelectPage;
