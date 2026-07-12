import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { useParams } from "react-router-dom";
import { MapDetailHeader } from "@proclaimer-content/pages/ministry/maps/map-detail-header/MapDetailHeader";
import { MapDetailContent } from "@proclaimer-content/pages/ministry/maps/map-detail-content/MapDetailContent";

function MapDetailPage() {
  const { map_id, file_type } = useParams<{ map_id: string; file_type: string }>();

  return (
    <IonPage>
      <IonHeader>
        <MapDetailHeader map_id={map_id} />
      </IonHeader>
      <IonContent scrollY={false} className="content-full remove-padding">
        <MapDetailContent map_id={map_id} file_type={file_type} />
      </IonContent>
    </IonPage>
  );
}

export default MapDetailPage;
