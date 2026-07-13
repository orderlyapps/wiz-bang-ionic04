import { useState } from "react";
import { IonAlert } from "@ionic/react";
import { ModalMultiSelectTrigger } from "@ui/components/inputs/modal-multi-select/components/modal-multi-select-trigger/ModalMultiSelectTrigger";

interface AlertPhoneInputProps {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  on_change: (value: string) => void;
}

export function AlertPhoneInput({
  label,
  value,
  placeholder,
  disabled = false,
  on_change,
}: AlertPhoneInputProps) {
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
            name: "phone",
            type: "tel",
            placeholder: placeholder ?? "Enter phone number...",
            value: value,
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Save",
            handler: (data: { phone: string }) => {
              on_change(data.phone.trim());
            },
          },
        ]}
        onDidDismiss={() => set_is_open(false)}
      />
    </>
  );
}
