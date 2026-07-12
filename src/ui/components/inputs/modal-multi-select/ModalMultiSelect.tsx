import type { ReactNode } from "react";
import { ModalMultiSelectTrigger } from "./components/modal-multi-select-trigger/ModalMultiSelectTrigger";

interface ModalMultiSelectProps {
  label: string;
  display_value: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  on_open: () => void;
}

export function ModalMultiSelect({
  label,
  display_value,
  placeholder,
  disabled = false,
  on_open,
}: ModalMultiSelectProps) {
  return (
    <ModalMultiSelectTrigger
      label={label}
      display_value={display_value}
      placeholder={placeholder}
      disabled={disabled}
      on_click={on_open}
    />
  );
}
