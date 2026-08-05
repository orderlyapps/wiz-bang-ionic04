import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CongregationBibleStudyHeader } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-header/CongregationBibleStudyHeader";
import { CongregationBibleStudyContent } from "@proclaimer-content/pages/home/congregation-bible-study/congregation-bible-study-content/CongregationBibleStudyContent";

function CongregationBibleStudyPage() {
  return (
    <IonPage>
      <IonHeader>
        <CongregationBibleStudyHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <CongregationBibleStudyContent />
      </IonContent>
    </IonPage>
  );
}

export default CongregationBibleStudyPage;
