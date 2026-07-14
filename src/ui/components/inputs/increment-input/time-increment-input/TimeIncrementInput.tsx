import { IncrementInput } from "@ui/components/inputs/increment-input/IncrementInput";

interface TimeIncrementInputProps {
  label: string;
  value_seconds: number;
  min_seconds?: number;
  max_seconds?: number;
  step_seconds?: number;
  on_change: (value_seconds: number) => void;
}

function formatTime(total_seconds: number): string {
  const minutes = Math.floor(total_seconds / 60);
  const seconds = total_seconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function TimeIncrementInput({
  label,
  value_seconds,
  min_seconds,
  max_seconds,
  step_seconds = 15,
  on_change,
}: TimeIncrementInputProps) {
  return (
    <IncrementInput
      label={label}
      value={value_seconds}
      min={min_seconds}
      max={max_seconds}
      step={step_seconds}
      display_value={formatTime(value_seconds)}
      on_change={on_change}
    />
  );
}
