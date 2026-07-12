import { IonToggle } from "@ionic/react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

export interface ToggleInputProps {
  label: string;
  checked: boolean;
  color?: IonicColor;
  disabled?: boolean;
  on_change: (checked: boolean) => void;
}

export function ToggleInput({
  label,
  checked,
  color,
  disabled = false,
  on_change,
}: ToggleInputProps) {
  return (
    <InputWrapper label={label} disabled={disabled}>
      <IonToggle
        checked={checked}
        color={color}
        disabled={disabled}
        onIonChange={(event) => on_change(event.detail.checked)}
        slot="end"
      />
    </InputWrapper>
  );
}
