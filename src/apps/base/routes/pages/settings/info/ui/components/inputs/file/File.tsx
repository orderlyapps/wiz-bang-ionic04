import { FileContent } from "@base-content/pages/settings/info/ui/components/inputs/file/file-content/FileContent";
import { FileHeader } from "@base-content/pages/settings/info/ui/components/inputs/file/file-header/FileHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function FilePage() {
  return (
    <IonPage>
      <IonHeader>
        <FileHeader />
      </IonHeader>
      <IonContent>
        <FileContent />
      </IonContent>
    </IonPage>
  );
}

export default FilePage;
