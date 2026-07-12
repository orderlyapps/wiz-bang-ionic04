import type { Ref } from "react";
import { maskitoPhoneOptionsGenerator } from "@maskito/phone";
import { useMaskito } from "@maskito/react";
import { IonInput } from "@ionic/react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

/**
 * PhoneInput
 *
 * A masked phone number input formatted for Australian numbers (+61).
 * Applies a Maskito phone mask using libphonenumber-js metadata so the
 * displayed value always conforms to the E.164 / national format for AU.
 *
 * @example
 * <PhoneInput
 *   label="Mobile"
 *   value={phone}
 *   placeholder="+61 4XX XXX XXX"
 *   on_change={set_phone}
 * />
 */

export interface PhoneInputProps {
  /** Display label rendered beside the input. */
  label: string;
  /** Current E.164 or partially-typed phone string. */
  value: string;
  /** Optional placeholder shown when the input is empty. */
  placeholder?: string;
  /** Ionic colour token (e.g. "primary"). */
  color?: IonicColor;
  /** Disables the input. Defaults to false. */
  disabled?: boolean;
  /** Makes the input read-only. Defaults to false. */
  readonly?: boolean;
  /** Shows a clear button when the field has a value. Defaults to false. */
  clear_input?: boolean;
  /** Callback receiving the updated phone string on every keystroke. */
  on_change: (value: string) => void;
  /** Optional callback fired when the input loses focus. */
  on_blur?: () => void;
}

const mask_options = maskitoPhoneOptionsGenerator({
  countryIsoCode: "AU",
  metadata: await import("libphonenumber-js/min/metadata").then((m) => m.default),
});

const element_predicate = async (host: HTMLElement) => {
  const ion_input = host as unknown as HTMLIonInputElement;
  return ion_input.getInputElement();
};

export function PhoneInput({
  label,
  value,
  placeholder,
  color,
  disabled = false,
  readonly = false,
  clear_input = false,
  on_change,
  on_blur,
}: PhoneInputProps) {
  const maskito_ref = useMaskito({ options: mask_options, elementPredicate: element_predicate });

  return (
    <InputWrapper label={label}>
      <IonInput
        ref={maskito_ref as unknown as Ref<HTMLIonInputElement>}
        value={value}
        type="tel"
        placeholder={placeholder}
        color={color}
        disabled={disabled}
        readonly={readonly}
        clearInput={value ? clear_input : false}
        onIonInput={(event) => on_change(event.detail.value ?? "")}
        onIonBlur={on_blur}
        slot="end"
      />
    </InputWrapper>
  );
}
