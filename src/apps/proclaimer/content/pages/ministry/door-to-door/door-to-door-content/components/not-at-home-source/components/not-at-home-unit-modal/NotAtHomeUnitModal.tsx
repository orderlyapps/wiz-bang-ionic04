import { useState } from "react";
import { IonButtons, IonContent, IonHeader, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { useNotAtHomeMarkers } from "../../hooks/useNotAtHomeMarkers";
import { handleDeleteNotAtHome } from "../../handlers/handleDeleteNotAtHome";
import { handleToggleNotAtHomeWrite } from "../../handlers/handleToggleNotAtHomeWrite";
import type { NotAtHome } from "../../types";
import { UnitSection } from "./components/unit-section/UnitSection";

type NotAtHomeUnitModalProps = {
  groupKey: string | null;
  onDismiss: () => void;
};

export function NotAtHomeUnitModal({ groupKey, onDismiss }: NotAtHomeUnitModalProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const groupedByAddress = useNotAtHomeMarkers();

  const units = (groupKey && groupedByAddress?.[groupKey]) || [];
  const firstUnit = units[0];
  const address = firstUnit
    ? `${firstUnit.house_number} ${firstUnit.street}, ${firstUnit.suburb}`
    : "";

  function handleDeleteUnit(unit: NotAtHome) {
    try {
      handleDeleteNotAtHome(unit.id);
      if (units.length === 1) {
        onDismiss();
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to delete unit");
    }
  }

  function handleMoveUnit(unit: NotAtHome) {
    try {
      handleToggleNotAtHomeWrite(unit.id, unit.write);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to update unit");
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
          <UnitSection
            title="Return List"
            units={units.filter((u) => !u.write)}
            onMove={handleMoveUnit}
            onDelete={handleDeleteUnit}
          />
          <UnitSection
            title="Write List"
            units={units.filter((u) => u.write)}
            onMove={handleMoveUnit}
            onDelete={handleDeleteUnit}
          />
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
