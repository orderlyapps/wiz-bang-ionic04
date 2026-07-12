import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PublisherListHeader } from "@proclaimer-content/pages/publishers/publisher-list/publisher-list-header/PublisherListHeader";
import { PublisherListContent } from "@proclaimer-content/pages/publishers/publisher-list/publisher-list-content/PublisherListContent";
import type { Publisher } from "@shared/database/schemas/publisher";

function MinisterialServantsPage() {
  const filter = (publisher: Publisher) =>
    publisher.standing === "ministerial_servant" &&
    publisher.type !== "speaker" &&
    !publisher.archived_at;

  return (
    <IonPage>
      <IonHeader>
        <PublisherListHeader title="Ministerial Servants" />
      </IonHeader>
      <IonContent className="content-wide">
        <PublisherListContent filter={filter} />
      </IonContent>
    </IonPage>
  );
}

export default MinisterialServantsPage;
