import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { WatchtowerHeader } from "@proclaimer-content/pages/home/watchtower/watchtower-header/WatchtowerHeader";
import { WatchtowerContent } from "@proclaimer-content/pages/home/watchtower/watchtower-content/WatchtowerContent";

function WatchtowerToolPage() {
  const [show_settings, setShowSettings] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <WatchtowerHeader on_settings={() => setShowSettings(true)} />
      </IonHeader>
      <IonContent className="ion-padding">
        <WatchtowerContent
          show_settings={show_settings}
          on_dismiss_settings={() => setShowSettings(false)}
        />
      </IonContent>
    </IonPage>
  );
}

export default WatchtowerToolPage;
