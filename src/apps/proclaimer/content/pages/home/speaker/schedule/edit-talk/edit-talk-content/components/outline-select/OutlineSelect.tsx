import { Select } from "@ui/components/inputs/select/Select";
import type { Outline } from "@shared/database/schemas/outline";

const EDIT_OUTLINES_VALUE = "edit_outlines";

interface OutlineSelectProps {
  label: string;
  value: string | null;
  placeholder: string;
  outlines: Outline[];
  disabled?: boolean;
  on_change: (outline_id: string | null) => void;
  on_edit_outlines?: () => void;
}

export function OutlineSelect({
  label,
  value,
  placeholder,
  outlines,
  disabled = false,
  on_change,
  on_edit_outlines,
}: OutlineSelectProps) {
  function handleChange(selected: string | string[] | null) {
    const selected_value = (selected as string) || null;
    if (selected_value === EDIT_OUTLINES_VALUE) {
      on_edit_outlines?.();
      return;
    }
    on_change(selected_value);
  }

  return (
    <Select
      label={label}
      value={value ?? ""}
      placeholder={placeholder}
      disabled={disabled}
      options={[
        ...outlines.map((outline) => ({
          value: outline.id,
          label: `${outline.id}: ${outline.theme}`,
        })),
        { value: EDIT_OUTLINES_VALUE, label: "Edit Outlines..." },
      ]}
      on_change={handleChange}
    />
  );
}
