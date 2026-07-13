import { useState } from "react";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { TextareaInput } from "@ui/components/inputs/textarea/TextareaInput";
import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import type { PersonDetails } from "../../handlers/handleUpdatePersonDetails";

type PersonDetailsFormProps = {
  initial: PersonDetails;
  onSave: (details: PersonDetails) => void;
  onCancel: () => void;
};

export function PersonDetailsForm({ initial, onSave, onCancel }: PersonDetailsFormProps) {
  const [firstName, setFirstName] = useState(initial.first_name);
  const [lastName, setLastName] = useState(initial.last_name);
  const [phoneNumber, setPhoneNumber] = useState(initial.phone_number);
  const [notes, setNotes] = useState(initial.notes);

  function handleSave() {
    onSave({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone_number: phoneNumber.trim(),
      notes: notes.trim(),
    });
  }

  return (
    <>
      <TextInput
        label="First Name"
        value={firstName}
        placeholder="First name..."
        on_change={setFirstName}
        autocomplete="given-name"
      />
      <TextInput
        label="Last Name"
        value={lastName}
        placeholder="Last name..."
        on_change={setLastName}
        autocomplete="family-name"
      />
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        placeholder="Phone number..."
        on_change={setPhoneNumber}
        autocomplete="tel"
      />
      <TextareaInput
        label="Notes"
        value={notes}
        placeholder="Person notes..."
        on_change={setNotes}
      />
      <Space />
      <SaveTextButton on_click={handleSave} />
      <Space />
      <TextButton label="Cancel" fill="clear" on_click={onCancel} />
    </>
  );
}
