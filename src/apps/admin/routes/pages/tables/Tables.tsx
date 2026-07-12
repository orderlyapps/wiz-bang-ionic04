import { TablesContent } from "@admin-content/pages/tables/tables-content/TablesContent";
import { TablesHeader } from "@admin-content/pages/tables/tables-header/TablesHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function TablesPage() {
  return (
    <IonPage>
      <IonHeader>
        <TablesHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <TablesContent />
      </IonContent>
    </IonPage>
  );
}

export default TablesPage;
