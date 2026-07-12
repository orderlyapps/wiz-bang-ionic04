import { useState } from "react";
import { IonAlert } from "@ionic/react";
import { ModalMultiSelectTrigger } from "@ui/components/inputs/modal-multi-select/components/modal-multi-select-trigger/ModalMultiSelectTrigger";

interface AlertTextInputProps {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  on_change: (value: string) => void;
}

export function AlertTextInput({
  label,
  value,
  placeholder,
  disabled = false,
  on_change,
}: AlertTextInputProps) {
  const [is_open, set_is_open] = useState(false);

  return (
    <>
      <ModalMultiSelectTrigger
        label={label}
        display_value={value || null}
        placeholder={placeholder}
        disabled={disabled}
        on_click={() => !disabled && set_is_open(true)}
      />
      <IonAlert
        isOpen={is_open}
        header={label}
        inputs={[
          {
            name: "text",
            type: "text",
            placeholder: placeholder ?? "Enter text...",
            value: value,
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Save",
            handler: (data: { text: string }) => {
              on_change(data.text.trim());
            },
          },
        ]}
        onDidDismiss={() => set_is_open(false)}
      />
    </>
  );
}
