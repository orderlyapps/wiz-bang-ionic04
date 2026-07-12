import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PrayerHeader } from "@proclaimer-content/pages/home/clam-overseer/participation/prayer/prayer-header/PrayerHeader";
import { PrayerContent } from "@proclaimer-content/pages/home/clam-overseer/participation/prayer/prayer-content/PrayerContent";

function PrayerPage() {
  return (
    <IonPage>
      <IonHeader>
        <PrayerHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <PrayerContent />
      </IonContent>
    </IonPage>
  );
}

export default PrayerPage;
