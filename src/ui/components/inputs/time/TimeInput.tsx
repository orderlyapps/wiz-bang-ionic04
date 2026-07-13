import { IonDatetime, IonModal } from "@ionic/react";
import { useState } from "react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import { Body } from "@ui/components/display/text/body/Body";
import { useThemeColorWhileOpen } from "@ui/components/inputs/date/hooks/useThemeColorWhileOpen";

interface TimeInputProps {
  label: string;
  value: string;
  disabled?: boolean;
  on_change: (value: string) => void;
}

export function TimeInput({ label, value, disabled = false, on_change }: TimeInputProps) {
  const [is_open, set_is_open] = useState(false);
  const iso_value = value ? `1970-01-01T${value}:00` : undefined;
  useThemeColorWhileOpen(is_open);

  function handleChange(detail_value: string | string[] | null | undefined) {
    if (!detail_value || Array.isArray(detail_value)) return;
    const time = detail_value.substring(11, 16);
    on_change(time);
  }

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

      <IonModal id="time-picker" isOpen={is_open} onDidDismiss={() => set_is_open(false)}>
        <IonDatetime
          presentation="time"
          value={iso_value}
          showDefaultButtons
          onIonChange={(e) => handleChange(e.detail.value)}
        />
      </IonModal>
    </InputWrapper>
  );
}

function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}
