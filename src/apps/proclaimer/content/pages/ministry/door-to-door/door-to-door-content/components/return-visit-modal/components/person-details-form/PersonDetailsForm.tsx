import { useEffect, useRef, useState } from "react";
import { NameInput } from "@ui/components/inputs/name/NameInput";
import type { NameValue } from "@ui/components/inputs/name/NameInput";
import { AlertPhoneInput } from "@ui/components/inputs/alert-phone/AlertPhoneInput";
import { TextareaInput } from "@ui/components/inputs/textarea/TextareaInput";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { returnVisitCollection } from "@shared/database/collections/return-visit";
import type { PersonDetails } from "../../handlers/handleUpdatePersonDetails";

type PersonDetailsFormProps = {
  id: string;
  initial: PersonDetails;
  onCancel: () => void;
  onError?: (message: string) => void;
  onEditLocation?: () => void;
};

export function PersonDetailsForm({
  id,
  initial,
  onCancel,
  onError,
  onEditLocation,
}: PersonDetailsFormProps) {
  const [name, setName] = useState<NameValue>({
    first_name: initial.first_name,
    middle_name: null,
    last_name: initial.last_name,
    display_name: null,
  });
  const [phoneNumber, setPhoneNumber] = useState(initial.phone_number);
  const [notes, setNotes] = useState(initial.notes);
  const notesDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (notesDebounceRef.current) clearTimeout(notesDebounceRef.current);
    };
  }, []);

  const displayValue = [name.first_name, name.last_name].filter(Boolean).join(" ");

  return (
    <>
      {onEditLocation && (
        <TextButton label="Edit Location" fill="clear" on_click={onEditLocation} />
      )}
      <NameInput
        label="Name"
        value={name}
        display_value={displayValue}
        placeholder="Enter name..."
        show_optional_fields={false}
        on_change={(value) => {
          setName(value);
          try {
            returnVisitCollection.update(id, (draft) => {
              draft.first_name = value.first_name;
              draft.last_name = value.last_name;
            });
          } catch (error) {
            onError?.(error instanceof Error ? error.message : "Failed to save name");
          }
        }}
      />
      <AlertPhoneInput
        label="Phone Number"
        value={phoneNumber}
        placeholder="Phone number..."
        on_change={(value) => {
          setPhoneNumber(value);
          try {
            returnVisitCollection.update(id, (draft) => {
              draft.phone_number = value;
            });
          } catch (error) {
            onError?.(error instanceof Error ? error.message : "Failed to save phone number");
          }
        }}
      />
      <TextareaInput
        label="Notes"
        value={notes}
        placeholder="Person notes..."
        on_change={(value) => {
          setNotes(value);
          if (notesDebounceRef.current) clearTimeout(notesDebounceRef.current);
          notesDebounceRef.current = setTimeout(() => {
            try {
              returnVisitCollection.update(id, (draft) => {
                draft.notes = value.trim();
              });
            } catch (error) {
              onError?.(error instanceof Error ? error.message : "Failed to save notes");
            }
          }, 500);
        }}
      />
      <Space />
      <TextButton label="Close" fill="clear" on_click={onCancel} />
    </>
  );
}
