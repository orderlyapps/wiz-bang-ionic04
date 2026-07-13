import { Select } from "@ui/components/inputs/select/Select";

const VISIT_TYPE_OPTIONS = [
  { label: "Return", value: "return" },
  { label: "Letter", value: "letter" },
  { label: "Return Visit", value: "return_visit" },
];

type VisitTypeSelectProps = {
  value: "letter" | "return" | "return_visit";
  disabled?: boolean;
  on_change: (value: "letter" | "return" | "return_visit") => void;
};

export function VisitTypeSelect({ value, disabled, on_change }: VisitTypeSelectProps) {
  return (
    <Select
      label="List"
      value={value}
      options={VISIT_TYPE_OPTIONS}
      disabled={disabled}
      on_change={(value) => on_change(value as "letter" | "return" | "return_visit")}
      interface_type="popover"
    />
  );
}
