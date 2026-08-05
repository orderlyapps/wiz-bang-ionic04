import { useState } from "react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import { Body } from "@ui/components/display/text/body/Body";
import { useThemeColorWhileOpen } from "@ui/components/inputs/date/hooks/useThemeColorWhileOpen";
import { TimePicker } from "@ui/components/inputs/time/components/time-picker/TimePicker";

interface TimeInputProps {
  label: string;
  value: string;
  disabled?: boolean;
  minute_step?: 1 | 5;
  on_change: (value: string) => void;
}

export function TimeInput({
  label,
  value,
  disabled = false,
  minute_step = 5,
  on_change,
}: TimeInputProps) {
  const [is_open, set_is_open] = useState(false);
  useThemeColorWhileOpen(is_open);

  return (
    <InputWrapper label={label}>
      <div
        onClick={() => !disabled && set_is_open(true)}
        style={{
          cursor: disabled ? "default" : "pointer",
          opacity: disabled ? 0.4 : 1,
          padding: "0.5rem 0",
        }}
      >
        <Body color={disabled || !value ? "medium" : undefined}>
          {value ? formatTime(value) : "Select time"}
        </Body>
      </div>

      <TimePicker
        is_open={is_open}
        value={value}
        minute_step={minute_step}
        on_change={on_change}
        on_close={() => set_is_open(false)}
      />
    </InputWrapper>
  );
}

function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}
