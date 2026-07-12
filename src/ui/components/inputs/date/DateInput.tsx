import { IonDatetime, IonModal } from "@ionic/react";
import { useState } from "react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import { Body } from "@ui/components/display/text/body/Body";
import { useThemeColorWhileOpen } from "@ui/components/inputs/date/hooks/useThemeColorWhileOpen";

interface DateInputProps {
  label: string;
  value: string;
  disabled?: boolean;
  on_change: (value: string) => void;
}

export function DateInput({ label, value, disabled = false, on_change }: DateInputProps) {
  const [is_open, set_is_open] = useState(false);
  const iso_value = value ? `${value}T00:00:00` : undefined;
  useThemeColorWhileOpen(is_open);

  function handleChange(detail_value: string | string[] | null | undefined) {
    if (!detail_value || Array.isArray(detail_value)) return;
    on_change(detail_value.substring(0, 10));
  }

  return (
    <InputWrapper label={label}>
      <div
        onClick={() => !disabled && set_is_open(true)}
        style={disabled ? { opacity: 0.4 } : undefined}
      >
        <Body color={disabled || !value ? "medium" : undefined}>
          {value
            ? new Date(value).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Select date"}
        </Body>
      </div>

      <IonModal id="date-picker" isOpen={is_open} onDidDismiss={() => set_is_open(false)}>
        <IonDatetime
          presentation="date"
          value={iso_value}
          showDefaultButtons
          onIonChange={(e) => handleChange(e.detail.value)}
        />
      </IonModal>
    </InputWrapper>
  );
}
