import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PublisherListHeader } from "@proclaimer-content/pages/publishers/publisher-list/publisher-list-header/PublisherListHeader";
import { PublisherListContent } from "@proclaimer-content/pages/publishers/publisher-list/publisher-list-content/PublisherListContent";
import type { Publisher } from "@shared/database/schemas/publisher";

function EldersPage() {
  const filter = (publisher: Publisher) =>
    publisher.standing === "elder" && publisher.type !== "speaker" && !publisher.archived_at;

  return (
    <IonPage>
      <IonHeader>
        <PublisherListHeader title="Elders" />
      </IonHeader>
      <IonContent className="content-wide">
        <PublisherListContent filter={filter} />
      </IonContent>
    </IonPage>
  );
}

export default EldersPage;
