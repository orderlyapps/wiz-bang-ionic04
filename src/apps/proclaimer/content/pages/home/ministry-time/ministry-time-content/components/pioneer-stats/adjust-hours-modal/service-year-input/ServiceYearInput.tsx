import { useState } from "react";
import { NumberInput } from "@ui/components/inputs/number/NumberInput";

interface ServiceYearInputProps {
  service_year: string;
  hours: number;
  is_current: boolean;
  on_save: (hours: number) => void;
}

export function ServiceYearInput({
  service_year,
  hours,
  is_current,
  on_save,
}: ServiceYearInputProps) {
  const [value, set_value] = useState(String(hours));
  const label = is_current ? `${service_year} (Current)` : service_year;

  function handleBlur() {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed > 0) {
      on_save(parsed);
    }
  }

  return <NumberInput label={label} value={value} on_change={set_value} on_blur={handleBlur} />;
}
