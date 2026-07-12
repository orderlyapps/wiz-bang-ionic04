import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ServiceOverseerHeader } from "@proclaimer-content/pages/home/service-overseer/service-overseer-header/ServiceOverseerHeader";
import { ServiceOverseerContent } from "@proclaimer-content/pages/home/service-overseer/service-overseer-content/ServiceOverseerContent";

function ServiceOverseerPage() {
  return (
    <IonPage>
      <IonHeader>
        <ServiceOverseerHeader />
      </IonHeader>
      <IonContent>
        <ServiceOverseerContent />
      </IonContent>
    </IonPage>
  );
}

export default ServiceOverseerPage;
