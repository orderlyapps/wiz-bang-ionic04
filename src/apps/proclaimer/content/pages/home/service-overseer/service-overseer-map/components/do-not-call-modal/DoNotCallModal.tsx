import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons } from "@ionic/react";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { Space } from "@ui/components/layout/space/Space";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { SuburbSelect } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/door-to-door-modal/suburb-select/SuburbSelect";
import { StreetSelect } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/door-to-door-modal/street-select/StreetSelect";
import { saveDoNotCall } from "./save-do-not-call";
import { useDoNotCallForm } from "./use-do-not-call-form";

type Props = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSave: (coordinates: [number, number]) => void;
};

export function DoNotCallModal({ isOpen, onDidDismiss, onSave }: Props) {
  const {
    selectedSuburb,
    selectedStreet,
    houseNumber,
    unitNumber,
    notes,
    handleSuburbSelect,
    handleStreetSelect,
    handleHouseNumberChange,
    handleUnitNumberChange,
    handleNotesChange,
    resetAfterSave,
  } = useDoNotCallForm();

  async function handleSave() {
    if (!selectedSuburb || !selectedStreet) return;
    const coordinates = await saveDoNotCall({
      suburb: selectedSuburb,
      street: selectedStreet,
      house_number: houseNumber,
      unit_number: unitNumber,
      notes,
    });
    if (coordinates) {
      resetAfterSave();
      onSave(coordinates);
    }
  }

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Do Not Call</IonTitle>
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
        <TextInput
          label="Notes"
          value={notes}
          placeholder="Add notes..."
          on_change={handleNotesChange}
        />
        {houseNumber && <Space />}
        {houseNumber && <SaveTextButton skip_confirmation on_click={handleSave} />}
      </IonContent>
    </ResponsiveModal>
  );
}
