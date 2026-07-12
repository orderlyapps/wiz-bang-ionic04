import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { BibleReadingHeader } from "@proclaimer-content/pages/home/clam-overseer/participation/bible-reading/bible-reading-header/BibleReadingHeader";
import { BibleReadingContent } from "@proclaimer-content/pages/home/clam-overseer/participation/bible-reading/bible-reading-content/BibleReadingContent";

function BibleReadingPage() {
  return (
    <IonPage>
      <IonHeader>
        <BibleReadingHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <BibleReadingContent />
      </IonContent>
    </IonPage>
  );
}

export default BibleReadingPage;
