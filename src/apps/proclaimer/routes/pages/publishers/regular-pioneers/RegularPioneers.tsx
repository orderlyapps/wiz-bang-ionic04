import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PublisherListHeader } from "@proclaimer-content/pages/publishers/publisher-list/publisher-list-header/PublisherListHeader";
import { PublisherListContent } from "@proclaimer-content/pages/publishers/publisher-list/publisher-list-content/PublisherListContent";
import type { Publisher } from "@shared/database/schemas/publisher";

function RegularPioneersPage() {
  const pioneerTypes = ["regular_pioneer", "special_pioneer", "continuous_auxiliary"];
  const filter = (publisher: Publisher) =>
    pioneerTypes.includes(publisher.type) && !publisher.archived_at;

  return (
    <IonPage>
      <IonHeader>
        <PublisherListHeader title="Pioneers" />
      </IonHeader>
      <IonContent className="content-wide">
        <PublisherListContent filter={filter} />
      </IonContent>
    </IonPage>
  );
}

export default RegularPioneersPage;
