import { useState } from "react";
import { IonButtons, IonContent, IonHeader, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { useReturnVisitMarkers } from "../../hooks/useReturnVisitMarkers";
import type { ReturnVisit } from "../../types";
import { UnitSection } from "./components/unit-section/UnitSection";
import { ReturnVisitModal } from "../../../../return-visit-modal/ReturnVisitModal";

type ReturnVisitUnitModalProps = {
  groupKey: string | null;
  onDismiss: () => void;
};

export function ReturnVisitUnitModal({ groupKey, onDismiss }: ReturnVisitUnitModalProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<ReturnVisit | null>(null);
  const groupedByAddress = useReturnVisitMarkers();

  const units = (groupKey && groupedByAddress?.[groupKey]) || [];
  const firstUnit = units[0];
  const address = firstUnit
    ? `${firstUnit.house_number} ${firstUnit.street}, ${firstUnit.suburb}`
    : "";

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
          <UnitSection units={units} onSelect={setSelectedUnit} />
        </IonContent>
      </ResponsiveModal>
      <ReturnVisitModal selected={selectedUnit} onDismiss={() => setSelectedUnit(null)} />
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
