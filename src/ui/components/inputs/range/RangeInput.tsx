import { IonRange } from "@ionic/react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

export interface RangeInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  color?: IonicColor;
  disabled?: boolean;
  pin?: boolean;
  snaps?: boolean;
  on_change: (value: number) => void;
}

export function RangeInput({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  color,
  disabled = false,
  pin = false,
  snaps = false,
  on_change,
}: RangeInputProps) {
  return (
    <InputWrapper label={label} disabled={disabled}>
      <IonRange
        value={value}
        min={min}
        max={max}
        step={step}
        color={color}
        disabled={disabled}
        pin={pin}
        snaps={snaps}
        onIonChange={(event) => on_change(event.detail.value as number)}
      />
    </InputWrapper>
  );
}
