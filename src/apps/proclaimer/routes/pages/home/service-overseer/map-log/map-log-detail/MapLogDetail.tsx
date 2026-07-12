import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { MapLogDetailHeader } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-detail/map-log-detail-header/MapLogDetailHeader";
import { MapLogDetailContent } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-detail/map-log-detail-content/MapLogDetailContent";
import type { MapRow } from "@shared/database/schemas/map";

interface MapLogDetailPageProps {
  match: {
    params: { map_id: string };
  };
}

function MapLogDetailPage({ match }: MapLogDetailPageProps) {
  const map_id = match.params.map_id;

  const { data: maps_data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const all_maps = (maps_data as MapRow[] | undefined) ?? [];
  const map_name = all_maps.find((m) => m.id === map_id)?.name ?? "Map";

  return (
    <IonPage>
      <IonHeader>
        <MapLogDetailHeader map_name={map_name} />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding ">
        <MapLogDetailContent map_id={map_id} />
      </IonContent>
    </IonPage>
  );
}

export default MapLogDetailPage;
