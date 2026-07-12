import { Select } from "@ui/components/inputs/select/Select";
import type { FontSize } from "@util/app/font-size/types";

interface FontSizeSelectorProps {
  value: FontSize;
  onChange: (size: FontSize) => void;
}

const font_size_options = [
  { label: "Extra Small", value: "xs" },
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
  { label: "Extra Large", value: "xl" },
  { label: "Huge", value: "2xl" },
];

export function FontSizeSelector({ value, onChange }: FontSizeSelectorProps) {
  return (
    <Select
      label="Font Size"
      value={value}
      options={font_size_options}
      on_change={(val) => onChange(val as FontSize)}
      interface_type="popover"
    />
  );
}
