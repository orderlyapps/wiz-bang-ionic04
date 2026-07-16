import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonModal } from "@ionic/react";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { Space } from "@ui/components/layout/space/Space";
import { SuburbSelect } from "./suburb-select/SuburbSelect";
import { StreetSelect } from "./street-select/StreetSelect";
import { VisitTypeSelect } from "./components/visit-type-select/VisitTypeSelect";
import { saveNotAtHome } from "./save-not-at-home";
import { saveReturnVisit } from "../return-visit-add-modal/save-return-visit";
import { useDoorToDoorForm } from "./use-door-to-door-form";

type DoorToDoorModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSave: (coordinates: [number, number]) => void;
};

export function DoorToDoorModal({ isOpen, onDidDismiss, onSave }: DoorToDoorModalProps) {
  const {
    selectedSuburb,
    selectedStreet,
    houseNumber,
    unitNumber,
    visitType,
    handleSuburbSelect,
    handleStreetSelect,
    handleHouseNumberChange,
    handleUnitNumberChange,
    handleVisitTypeChange,
    resetAfterSave,
  } = useDoorToDoorForm();

  async function handleSave() {
    if (!selectedSuburb || !selectedStreet) return;
    const coordinates =
      visitType === "return_visit"
        ? await saveReturnVisit({
            suburb: selectedSuburb,
            street: selectedStreet,
            house_number: houseNumber,
            unit_number: unitNumber,
          })
        : await saveNotAtHome({
            suburb: selectedSuburb,
            street: selectedStreet,
            house_number: houseNumber,
            unit_number: unitNumber,
            visit_type: visitType,
          });
    if (coordinates) {
      resetAfterSave();
      onSave(coordinates);
    }
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Door to Door</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={onDidDismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SuburbSelect
          label="Suburb"
          value={selectedSuburb}
          placeholder="Choose a suburb..."
          onSelect={handleSuburbSelect}
        />

        <StreetSelect
          label="Street"
          value={selectedStreet}
          placeholder="Choose a street..."
          disabled={!selectedSuburb}
          suburbId={selectedSuburb?.id}
          suburb={selectedSuburb}
          onSelect={handleStreetSelect}
        />

        <TextInput
          label="House Number"
          value={houseNumber}
          placeholder="Enter house number..."
          disabled={!selectedStreet}
          on_change={handleHouseNumberChange}
        />

        <TextInput
          label="Unit Number"
          value={unitNumber}
          placeholder="Enter unit number..."
          disabled={!houseNumber}
          on_change={handleUnitNumberChange}
        />

        <VisitTypeSelect
          value={visitType}
          disabled={!houseNumber}
          on_change={handleVisitTypeChange}
        />
        {houseNumber && <Space />}
        {houseNumber && <SaveTextButton skip_confirmation on_click={handleSave} />}
      </IonContent>
    </IonModal>
  );
}
