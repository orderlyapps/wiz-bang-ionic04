import { InputWrapperContent } from "@base-content/pages/settings/info/ui/components/inputs/input-wrapper/input-wrapper-content/InputWrapperContent";
import { InputWrapperHeader } from "@base-content/pages/settings/info/ui/components/inputs/input-wrapper/input-wrapper-header/InputWrapperHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function InputWrapperPage() {
  return (
    <IonPage>
      <IonHeader>
        <InputWrapperHeader />
      </IonHeader>
      <IonContent>
        <InputWrapperContent />
      </IonContent>
    </IonPage>
  );
}

export default InputWrapperPage;
