import type { ReactNode } from "react";
import { useState } from "react";
import { IonAlert } from "@ionic/react";
import { ModalMultiSelectTrigger } from "@ui/components/inputs/modal-multi-select/components/modal-multi-select-trigger/ModalMultiSelectTrigger";

interface AlertMultiSelectOption<T extends string> {
  label: string;
  value: T;
}

interface AlertMultiSelectProps<T extends string> {
  label: string;
  options: AlertMultiSelectOption<T>[];
  selected: T[];
  placeholder?: string;
  disabled?: boolean;
  on_change: (selected: T[]) => void;
  render_selected?: (selected: T[], options: AlertMultiSelectOption<T>[]) => ReactNode;
}

export function AlertMultiSelect<T extends string>({
  label,
  options,
  selected,
  placeholder,
  disabled = false,
  on_change,
  render_selected,
}: AlertMultiSelectProps<T>) {
  const [is_open, set_is_open] = useState(false);

  const display_value = render_selected
    ? render_selected(selected, options)
    : selected.length > 0
      ? options
          .filter((o) => selected.includes(o.value))
          .map((o) => o.label)
          .join(", ")
      : null;

  return (
    <>
      <ModalMultiSelectTrigger
        label={label}
        display_value={display_value}
        placeholder={placeholder}
        disabled={disabled}
        on_click={() => !disabled && set_is_open(true)}
      />
      <IonAlert
        isOpen={is_open}
        header={label}
        inputs={options.map((o) => ({
          type: "checkbox" as const,
          label: o.label,
          value: o.value,
          checked: selected.includes(o.value),
        }))}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "OK",
            handler: (values: T[]) => on_change(values),
          },
        ]}
        onDidDismiss={() => set_is_open(false)}
      />
    </>
  );
}
