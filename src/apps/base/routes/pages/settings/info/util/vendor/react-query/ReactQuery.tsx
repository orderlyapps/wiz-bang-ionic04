import { ReactQueryContent } from "@base-content/pages/settings/info/util/vendor/react-query/react-query-content/ReactQueryContent";
import { ReactQueryHeader } from "@base-content/pages/settings/info/util/vendor/react-query/react-query-header/ReactQueryHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function ReactQueryPage() {
  return (
    <IonPage>
      <IonHeader>
        <ReactQueryHeader />
      </IonHeader>
      <IonContent>
        <ReactQueryContent />
      </IonContent>
    </IonPage>
  );
}

export default ReactQueryPage;
