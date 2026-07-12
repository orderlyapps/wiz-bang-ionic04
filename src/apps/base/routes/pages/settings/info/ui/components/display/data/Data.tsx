import { DataContent } from "@base-content/pages/settings/info/ui/components/display/data/data-content/DataContent";
import { DataHeader } from "@base-content/pages/settings/info/ui/components/display/data/data-header/DataHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function DataPage() {
  return (
    <IonPage>
      <IonHeader>
        <DataHeader />
      </IonHeader>
      <IonContent>
        <DataContent />
      </IonContent>
    </IonPage>
  );
}

export default DataPage;
