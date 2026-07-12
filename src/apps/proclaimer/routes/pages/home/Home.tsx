import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { HomeHeader } from "@proclaimer-content/pages/home/home-header/HomeHeader";
import { HomeContent } from "@proclaimer-content/pages/home/home-content/HomeContent";

function HomePage() {
  return (
    <IonPage>
      <IonHeader>
        <HomeHeader />
      </IonHeader>
      <IonContent>
        <HomeContent />
      </IonContent>
    </IonPage>
  );
}

export default HomePage;
