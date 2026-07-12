import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { EventsHeader } from "@proclaimer-content/pages/home/events/events-header/EventsHeader";
import { EventsContent } from "@proclaimer-content/pages/schedules/events/events-content/EventsContent";

function HomeEventsPage() {
  return (
    <IonPage>
      <IonHeader>
        <EventsHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <EventsContent />
      </IonContent>
    </IonPage>
  );
}

export default HomeEventsPage;
