import { IonButton, IonIcon } from "@ionic/react";
import { add, remove } from "ionicons/icons";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import { Body } from "@ui/components/display/text/body/Body";

export interface IncrementInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  color?: IonicColor;
  disabled?: boolean;
  display_value?: string;
  on_change: (value: number) => void;
}

export function IncrementInput({
  label,
  value,
  min,
  max,
  step = 1,
  color,
  disabled = false,
  display_value,
  on_change,
}: IncrementInputProps) {
  const handle_decrement = () => {
    const new_value = value - step;
    if (min === undefined || new_value >= min) {
      on_change(new_value);
    }
  };

  const handle_increment = () => {
    const new_value = value + step;
    if (max === undefined || new_value <= max) {
      on_change(new_value);
    }
  };

  const is_at_min = min !== undefined && value <= min;
  const is_at_max = max !== undefined && value >= max;

  return (
    <InputWrapper label={label} disabled={disabled}>
      <div className="ion-display-flex ion-align-items-center">
        <IonButton
          color={color}
          fill="clear"
          disabled={disabled || is_at_min}
          onClick={handle_decrement}
          style={{ "font-size": "1.05rem" }}
        >
          <IonIcon slot="icon-only" icon={remove} />
        </IonButton>
        <Body size="xl" className="ion-margin-horizontal" style={{ opacity: disabled ? 0.3 : 1 }}>
          {display_value ?? value}
        </Body>
        <IonButton
          color={color}
          fill="clear"
          disabled={disabled || is_at_max}
          onClick={handle_increment}
          style={{ "font-size": "1.05rem" }}
        >
          <IonIcon slot="icon-only" icon={add} />
        </IonButton>
      </div>
    </InputWrapper>
  );
}
