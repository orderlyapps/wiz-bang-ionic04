import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { StatsHeader } from "@proclaimer-content/pages/home/elder/reports/stats/stats-header/StatsHeader";
import { StatsContent } from "@proclaimer-content/pages/home/elder/reports/stats/stats-content/StatsContent";

function StatsPage() {
  return (
    <IonPage>
      <IonHeader>
        <StatsHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <StatsContent />
      </IonContent>
    </IonPage>
  );
}

export default StatsPage;
