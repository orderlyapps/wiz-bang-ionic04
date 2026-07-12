import { IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { MapLogList } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-detail/map-log-detail-content/components/map-log-list/MapLogList";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";

interface MapLogModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  map_id: string;
}

export function MapLogModal({ isOpen, onDidDismiss, map_id }: MapLogModalProps) {
  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map Logs</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={onDidDismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding content-wide">
        <MapLogList map_id={map_id} />
      </IonContent>
    </ResponsiveModal>
  );
}
