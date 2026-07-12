import { ModalSelectTrigger } from "./components/modal-select-trigger/ModalSelectTrigger";

interface ModalSelectProps {
  label: string;
  display_value: string;
  placeholder?: string;
  disabled?: boolean;
  on_open: () => void;
}

export function ModalSelect({
  label,
  display_value,
  placeholder,
  disabled = false,
  on_open,
}: ModalSelectProps) {
  return (
    <ModalSelectTrigger
      label={label}
      display_value={display_value}
      placeholder={placeholder}
      disabled={disabled}
      on_click={on_open}
    />
  );
}
