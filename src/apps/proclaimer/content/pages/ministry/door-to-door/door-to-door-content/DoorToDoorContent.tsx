import { useState } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { MapView } from "@util/vendor/mapbox/MapView";
import { NotAtHomeSource } from "./components/not-at-home-source/NotAtHomeSource";
import { NotAtHomeAlert } from "./components/not-at-home-source/components/not-at-home-alert/NotAtHomeAlert";
import { NotAtHomeUnitModal } from "./components/not-at-home-source/components/not-at-home-unit-modal/NotAtHomeUnitModal";
import type { NotAtHome } from "./components/not-at-home-source/types";
import { DoorToDoorModal } from "./components/door-to-door-modal/DoorToDoorModal";
import { MapZoomToController } from "./components/map-zoom-to-controller/MapZoomToController";
import { MapShareActionSheet } from "./components/map-share-action-sheet/MapShareActionSheet";
import { NotAtHomeEditLocationMarker } from "./components/not-at-home-source/components/not-at-home-location-editor/NotAtHomeEditLocationMarker";
import { NotAtHomeEditLocationFabs } from "./components/not-at-home-source/components/not-at-home-location-editor/NotAtHomeEditLocationFabs";
import { MapMasterLayer } from "./components/layers/map-master-layer/MapMasterLayer";
import { MapsLayer } from "./components/layers/maps-layer/MapsLayer";
import { BlocksLayer } from "./components/layers/blocks-layer/BlocksLayer";
import { useMapZoom } from "./context/mapZoomContext";
import { DoNotCallSource } from "./components/layers/do-not-call-source/DoNotCallSource";
import { DoNotCallAlert } from "./components/layers/do-not-call-source/components/do-not-call-alert/DoNotCallAlert";
import type { DoNotCall } from "./components/layers/do-not-call-source/types";
import { useMapStyle } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useMapStyleContext";
import { useQuickLinks } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useQuickLinksContext";
import { QuickLinksFab } from "./components/quick-links-fab/QuickLinksFab";
import { useNotAtHomeLocationEditor } from "./hooks/useNotAtHomeLocationEditor";
import { useReturnVisitLocationEditor } from "./hooks/useReturnVisitLocationEditor";
import { ReturnVisitSource } from "./components/layers/return-visit-source/ReturnVisitSource";
import type { ReturnVisit } from "./components/layers/return-visit-source/types";
import { ReturnVisitModal } from "./components/return-visit-modal/ReturnVisitModal";
import { ReturnVisitUnitModal } from "./components/layers/return-visit-source/components/return-visit-unit-modal/ReturnVisitUnitModal";

type ShareLocation = {
  lat: number;
  lng: number;
};

export function DoorToDoorContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotAtHome, setSelectedNotAtHome] = useState<NotAtHome | null>(null);
  const [selectedUnitsKey, setSelectedUnitsKey] = useState<string | null>(null);
  const [shareLocation, setShareLocation] = useState<ShareLocation | null>(null);
  const [selectedDoNotCall, setSelectedDoNotCall] = useState<DoNotCall | null>(null);
  const [selectedReturnVisit, setSelectedReturnVisit] = useState<ReturnVisit | null>(null);
  const [selectedReturnVisitGroupKey, setSelectedReturnVisitGroupKey] = useState<string | null>(
    null,
  );
  const nahLocationEditor = useNotAtHomeLocationEditor();
  const rvLocationEditor = useReturnVisitLocationEditor();
  const activeEditor = nahLocationEditor.isEditing ? nahLocationEditor : rvLocationEditor;
  const { zoomToRef } = useMapZoom();
  const { styleId } = useMapStyle();
  const { fabVisible } = useQuickLinks();

  return (
    <>
      <MapView
        id="door-to-door"
        style={{ position: "absolute", inset: 0 }}
        height="100%"
        styleId={styleId}
        on_long_press={(lngLat) => setShareLocation({ lat: lngLat.lat, lng: lngLat.lng })}
      >
        <MapMasterLayer />
        <MapsLayer />
        <BlocksLayer />
        <DoNotCallSource onSelect={setSelectedDoNotCall} />
        <ReturnVisitSource
          onSelect={setSelectedReturnVisit}
          onSelectGroup={setSelectedReturnVisitGroupKey}
        />
        <NotAtHomeSource onSelect={setSelectedNotAtHome} onSelectUnits={setSelectedUnitsKey} />
        {activeEditor.editingCoordinates && (
          <NotAtHomeEditLocationMarker
            coordinates={activeEditor.editingCoordinates}
            onChange={activeEditor.updateCoordinates}
          />
        )}
        <MapZoomToController zoomToRef={zoomToRef} />
      </MapView>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => setIsModalOpen(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      {fabVisible && <QuickLinksFab />}
      {activeEditor.isEditing && (
        <NotAtHomeEditLocationFabs
          onSave={activeEditor.saveEditing}
          onCancel={activeEditor.cancelEditing}
        />
      )}

      <DoorToDoorModal
        isOpen={isModalOpen}
        onDidDismiss={() => setIsModalOpen(false)}
        onSave={(coordinates) => {
          setIsModalOpen(false);
          zoomToRef.current?.(coordinates);
        }}
      />

      <ReturnVisitModal
        selected={selectedReturnVisit}
        onDismiss={() => setSelectedReturnVisit(null)}
        onEditLocation={(rv) => {
          setSelectedReturnVisit(null);
          rvLocationEditor.startEditing(rv);
        }}
      />
      <ReturnVisitUnitModal
        groupKey={selectedReturnVisitGroupKey}
        onDismiss={() => setSelectedReturnVisitGroupKey(null)}
      />

      <DoNotCallAlert selected={selectedDoNotCall} onDismiss={() => setSelectedDoNotCall(null)} />
      <NotAtHomeAlert
        selected={selectedNotAtHome}
        onDismiss={() => setSelectedNotAtHome(null)}
        onEditLocation={() => {
          if (selectedNotAtHome) {
            nahLocationEditor.startEditing(selectedNotAtHome);
            setSelectedNotAtHome(null);
          }
        }}
      />
      <NotAtHomeUnitModal groupKey={selectedUnitsKey} onDismiss={() => setSelectedUnitsKey(null)} />

      <MapShareActionSheet
        lat={shareLocation?.lat ?? 0}
        lng={shareLocation?.lng ?? 0}
        is_open={shareLocation !== null}
        on_dismiss={() => setShareLocation(null)}
      />
    </>
  );
}
