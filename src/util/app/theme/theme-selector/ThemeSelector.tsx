import { Select } from "@ui/components/inputs/select/Select";
import type { ThemeMode } from "@util/app/theme/types";

interface ThemeSelectorProps {
  value: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}

const theme_options = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Auto", value: "auto" },
];

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <Select
      label="Theme"
      value={value}
      options={theme_options}
      on_change={(val) => onChange(val as ThemeMode)}
      interface_type="popover"
    />
  );
}
