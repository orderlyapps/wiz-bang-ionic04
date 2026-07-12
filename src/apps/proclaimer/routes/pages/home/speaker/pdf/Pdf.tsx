import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PdfHeader } from "@proclaimer-content/pages/home/speaker/pdf/pdf-header/PdfHeader";
import { PdfContent } from "@proclaimer-content/pages/home/speaker/pdf/pdf-content/PdfContent";

function SpeakerPdfPage() {
  return (
    <IonPage>
      <IonHeader>
        <PdfHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <PdfContent />
      </IonContent>
    </IonPage>
  );
}

export default SpeakerPdfPage;
