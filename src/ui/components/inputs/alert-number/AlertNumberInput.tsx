import { useState } from "react";
import { IonAlert } from "@ionic/react";
import { ModalMultiSelectTrigger } from "@ui/components/inputs/modal-multi-select/components/modal-multi-select-trigger/ModalMultiSelectTrigger";

interface AlertNumberInputProps {
  label: string;
  value: number | null;
  placeholder?: string;
  disabled?: boolean;
  on_change: (value: number | null) => void;
}

export function AlertNumberInput({
  label,
  value,
  placeholder,
  disabled = false,
  on_change,
}: AlertNumberInputProps) {
  const [is_open, set_is_open] = useState(false);

  return (
    <>
      <ModalMultiSelectTrigger
        label={label}
        display_value={value !== null ? String(value) : null}
        placeholder={placeholder}
        disabled={disabled}
        on_click={() => !disabled && set_is_open(true)}
      />
      <IonAlert
        isOpen={is_open}
        header={label}
        inputs={[
          {
            name: "number",
            type: "number",
            placeholder: placeholder ?? "Enter number...",
            value: value !== null ? String(value) : "",
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Save",
            handler: (data: { number: string }) => {
              const trimmed = data.number.trim();
              const parsed = trimmed === "" ? null : Number(trimmed);
              on_change(parsed !== null && isNaN(parsed) ? null : parsed);
            },
          },
        ]}
        onDidDismiss={() => set_is_open(false)}
      />
    </>
  );
}
