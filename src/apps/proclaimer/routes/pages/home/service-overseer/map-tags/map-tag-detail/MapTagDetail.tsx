import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapTagCollection } from "@shared/database/collections/map-tag";
import { MapTagDetailHeader } from "@proclaimer-content/pages/home/service-overseer/map-tags/map-tag-detail/map-tag-detail-header/MapTagDetailHeader";
import { MapTagDetailContent } from "@proclaimer-content/pages/home/service-overseer/map-tags/map-tag-detail/map-tag-detail-content/MapTagDetailContent";
import type { MapTagRow } from "@shared/database/schemas/map-tag";

interface MapTagDetailPageProps {
  match: {
    params: { tag_id: string };
  };
}

function MapTagDetailPage({ match }: MapTagDetailPageProps) {
  const tag_id = match.params.tag_id;

  const { data: tags_data } = useLiveQuery((q) => q.from({ t: mapTagCollection }));
  const all_tags = (tags_data as MapTagRow[] | undefined) ?? [];
  const tag_name = all_tags.find((t) => t.id === tag_id)?.name ?? "Tag";

  return (
    <IonPage>
      <IonHeader>
        <MapTagDetailHeader tag_name={tag_name} />
      </IonHeader>
      <IonContent className="content-wide">
        <MapTagDetailContent tag_id={tag_id} />
      </IonContent>
    </IonPage>
  );
}

export default MapTagDetailPage;
