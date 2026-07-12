import { ReactPdfContent } from "@base-content/pages/settings/info/util/vendor/react-pdf/react-pdf-content/ReactPdfContent";
import { ReactPdfHeader } from "@base-content/pages/settings/info/util/vendor/react-pdf/react-pdf-header/ReactPdfHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function ReactPdfPage() {
  return (
    <IonPage>
      <IonHeader>
        <ReactPdfHeader />
      </IonHeader>
      <IonContent>
        <ReactPdfContent />
      </IonContent>
    </IonPage>
  );
}

export default ReactPdfPage;
