import { useState } from "react";
import { IonButtons, IonContent, IonHeader, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { useDoNotCallMarkers } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/layers/do-not-call-source/hooks/useDoNotCallMarkers";
import { doNotCallCollection } from "@shared/database/collections/do-not-call";
import type { DoNotCall } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/layers/do-not-call-source/types";
import { DoNotCallUnitSection } from "./components/do-not-call-unit-section/DoNotCallUnitSection";

type DoNotCallUnitModalProps = {
  groupKey: string | null;
  onDismiss: () => void;
};

export function DoNotCallUnitModal({ groupKey, onDismiss }: DoNotCallUnitModalProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const groupedByAddress = useDoNotCallMarkers();

  const units = (groupKey && groupedByAddress?.[groupKey]) || [];
  const firstUnit = units[0];
  const address = firstUnit
    ? `${firstUnit.house_number} ${firstUnit.street}, ${firstUnit.suburb}`
    : "";

  async function handleDeleteUnit(unit: DoNotCall) {
    try {
      if (!unit.id) return;
      doNotCallCollection.delete(unit.id);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to delete unit");
    }
  }

  return (
    <>
      <ResponsiveModal isOpen={!!groupKey && units.length > 0} onDidDismiss={onDismiss}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{address}</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton on_click={onDismiss} skip_confirmation />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <DoNotCallUnitSection units={units} onDelete={handleDeleteUnit} />
        </IonContent>
      </ResponsiveModal>
      <IonToast
        isOpen={!!errorMessage}
        message={errorMessage ?? ""}
        duration={3000}
        color="danger"
        onDidDismiss={() => setErrorMessage(null)}
      />
    </>
  );
}
