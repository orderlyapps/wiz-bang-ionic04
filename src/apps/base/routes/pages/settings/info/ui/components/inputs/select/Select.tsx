import { SelectContent } from "@base-content/pages/settings/info/ui/components/inputs/select/select-content/SelectContent";
import { SelectHeader } from "@base-content/pages/settings/info/ui/components/inputs/select/select-header/SelectHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function SelectPage() {
  return (
    <IonPage>
      <IonHeader>
        <SelectHeader />
      </IonHeader>
      <IonContent>
        <SelectContent />
      </IonContent>
    </IonPage>
  );
}

export default SelectPage;
