import { IonTextarea } from "@ionic/react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

export interface TextareaInputProps {
  label: string;
  value: string;
  placeholder?: string;
  color?: IonicColor;
  disabled?: boolean;
  readonly?: boolean;
  auto_grow?: boolean;
  rows?: number;
  max_length?: number;
  name?: string;
  id?: string;
  on_change: (value: string) => void;
  on_blur?: () => void;
}

export function TextareaInput({
  label,
  value,
  placeholder,
  color,
  disabled = false,
  readonly = false,
  auto_grow = true,
  rows = 4,
  max_length,
  name,
  id,
  on_change,
  on_blur,
}: TextareaInputProps) {
  return (
    <InputWrapper label={label} disabled={disabled}>
      <IonTextarea
        value={value}
        placeholder={placeholder}
        color={color}
        disabled={disabled}
        readonly={readonly}
        autoGrow={auto_grow}
        rows={rows}
        maxlength={max_length}
        name={name}
        id={id}
        onIonInput={(event) => on_change(event.detail.value ?? "")}
        onIonBlur={on_blur}
      />
    </InputWrapper>
  );
}
