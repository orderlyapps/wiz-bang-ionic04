import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { mapCheckoutPublisherCollection } from "@shared/database/collections/map-checkout-publisher";
import { MapCheckoutDetailHeader } from "@proclaimer-content/pages/home/service-overseer/map-checkout/map-checkout-detail/map-checkout-detail-header/MapCheckoutDetailHeader";
import { MapCheckoutDetailContent } from "@proclaimer-content/pages/home/service-overseer/map-checkout/map-checkout-detail/map-checkout-detail-content/MapCheckoutDetailContent";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { MapCheckoutPublisherRow } from "@shared/database/schemas/map-checkout-publisher";

interface MapCheckoutDetailPageProps {
  match: {
    params: { publisher_id: string };
  };
}

function MapCheckoutDetailPage({ match }: MapCheckoutDetailPageProps) {
  const publisher_id = match.params.publisher_id;

  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }));
  const { data: checkout_publishers_data } = useLiveQuery((q) =>
    q.from({ cp: mapCheckoutPublisherCollection }),
  );

  const all_publishers = (publishers_data as Publisher[] | undefined) ?? [];
  const publisher = all_publishers.find((p) => p.id === publisher_id);
  const publisher_name = publisher ? getPublisherDisplayName(publisher) : "Publisher";

  const all_checkout_publishers =
    (checkout_publishers_data as MapCheckoutPublisherRow[] | undefined) ?? [];
  const checkout_publisher = all_checkout_publishers.find((cp) => cp.publisher_id === publisher_id);

  return (
    <IonPage>
      <IonHeader>
        <MapCheckoutDetailHeader publisher_name={publisher_name} />
      </IonHeader>
      <IonContent className="content-wide">
        <MapCheckoutDetailContent
          checkout_publisher_id={checkout_publisher?.id}
          max_maps={checkout_publisher?.max_maps ?? 1}
        />
      </IonContent>
    </IonPage>
  );
}

export default MapCheckoutDetailPage;
