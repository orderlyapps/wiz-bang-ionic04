import { SortContent } from "@base-content/pages/settings/info/util/sort/sort-content/SortContent";
import { SortHeader } from "@base-content/pages/settings/info/util/sort/sort-header/SortHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function SortPage() {
  return (
    <IonPage>
      <IonHeader>
        <SortHeader />
      </IonHeader>
      <IonContent>
        <SortContent />
      </IonContent>
    </IonPage>
  );
}

export default SortPage;
