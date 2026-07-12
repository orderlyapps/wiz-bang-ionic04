import { IonInput, IonInputPasswordToggle } from "@ionic/react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

export interface BaseInputProps {
  type: "text" | "password" | "email" | "number";
  label: string;
  value: string;
  placeholder?: string;
  color?: IonicColor;
  disabled?: boolean;
  readonly?: boolean;
  clear_input?: boolean;
  max_length?: number;
  name?: string;
  id?: string;
  on_change: (value: string) => void;
  on_blur?: () => void;
  autocomplete?:
    | "additional-name"
    | "address-level1"
    | "address-level2"
    | "address-level3"
    | "address-level4"
    | "address-line1"
    | "address-line2"
    | "address-line3"
    | "bday"
    | "bday-day"
    | "bday-month"
    | "bday-year"
    | "cc-additional-name"
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-family-name"
    | "cc-given-name"
    | "cc-name"
    | "cc-number"
    | "cc-type"
    | "country"
    | "country-name"
    | "current-password"
    | "email"
    | "family-name"
    | "given-name"
    | "honorific-prefix"
    | "honorific-suffix"
    | "impp"
    | "language"
    | "name"
    | "new-password"
    | "nickname"
    | "off"
    | "on"
    | "one-time-code"
    | "organization"
    | "organization-title"
    | "photo"
    | "postal-code"
    | "sex"
    | "street-address"
    | "tel"
    | "tel-area-code"
    | "tel-country-code"
    | "tel-extension"
    | "tel-local"
    | "tel-national"
    | "transaction-amount"
    | "transaction-currency"
    | "url"
    | "username";
}

export function BaseInput({
  type,
  label,
  value,
  placeholder,
  color,
  disabled = false,
  readonly = false,
  clear_input = true,
  max_length,
  name,
  id,
  on_change,
  on_blur,
  autocomplete,
}: BaseInputProps) {
  return (
    <InputWrapper label={label} disabled={disabled}>
      <IonInput
        value={value}
        type={type}
        placeholder={placeholder}
        color={color}
        disabled={disabled}
        readonly={readonly}
        clearInput={clear_input}
        maxlength={max_length}
        name={name}
        id={id}
        onIonInput={(event) => on_change(event.detail.value ?? "")}
        onIonBlur={on_blur}
        autocomplete={autocomplete}
      >
        {type === "password" && <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>}
      </IonInput>
    </InputWrapper>
  );
}
