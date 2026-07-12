import { Select } from "@ui/components/inputs/select/Select";

const VISIT_TYPE_OPTIONS = [
  { label: "Return", value: "return" },
  { label: "Letter", value: "letter" },
];

type VisitTypeSelectProps = {
  value: "letter" | "return";
  disabled?: boolean;
  on_change: (value: "letter" | "return") => void;
};

export function VisitTypeSelect({ value, disabled, on_change }: VisitTypeSelectProps) {
  return (
    <Select
      label="List"
      value={value}
      options={VISIT_TYPE_OPTIONS}
      disabled={disabled}
      on_change={(value) => on_change(value as "letter" | "return")}
      interface_type="popover"
    />
  );
}
