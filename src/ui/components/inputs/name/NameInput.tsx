import { useState } from "react";
import { IonAlert } from "@ionic/react";
import { ModalMultiSelectTrigger } from "@ui/components/inputs/modal-multi-select/components/modal-multi-select-trigger/ModalMultiSelectTrigger";

export interface NameValue {
  first_name: string;
  middle_name: string | null;
  last_name: string;
  display_name: string | null;
}

interface NameInputProps {
  label: string;
  value: NameValue;
  display_value: string;
  placeholder?: string;
  disabled?: boolean;
  show_optional_fields?: boolean;
  on_change: (value: NameValue) => void;
}

export function NameInput({
  label,
  value,
  display_value,
  placeholder,
  disabled = false,
  show_optional_fields = true,
  on_change,
}: NameInputProps) {
  const [is_open, set_is_open] = useState(false);

  return (
    <>
      <ModalMultiSelectTrigger
        label={label}
        display_value={display_value || null}
        placeholder={placeholder}
        disabled={disabled}
        on_click={() => !disabled && set_is_open(true)}
      />
      <IonAlert
        isOpen={is_open}
        header={label}
        inputs={[
          { name: "first_name", placeholder: "First Name", value: value.first_name },
          ...(show_optional_fields
            ? [
                {
                  name: "middle_name",
                  placeholder: "Middle Name (optional)",
                  value: value.middle_name ?? "",
                },
              ]
            : []),
          { name: "last_name", placeholder: "Last Name", value: value.last_name },
          ...(show_optional_fields
            ? [
                {
                  name: "display_name",
                  placeholder: "Goes By (optional)",
                  value: value.display_name ?? "",
                },
              ]
            : []),
        ]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Save",
            handler: (data: {
              first_name: string;
              middle_name?: string;
              last_name: string;
              display_name?: string;
            }) => {
              if (!data.first_name.trim() || !data.last_name.trim()) return false;
              on_change({
                first_name: data.first_name.trim(),
                middle_name: data.middle_name?.trim() || null,
                last_name: data.last_name.trim(),
                display_name: data.display_name?.trim() || null,
              });
            },
          },
        ]}
        onDidDismiss={() => set_is_open(false)}
      />
    </>
  );
}
