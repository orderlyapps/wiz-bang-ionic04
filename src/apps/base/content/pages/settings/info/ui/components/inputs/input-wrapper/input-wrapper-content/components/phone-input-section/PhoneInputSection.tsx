import { useState } from "react";
import { PhoneInput } from "@ui/components/inputs/phone/PhoneInput";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "label", value: "— Display label for the input." },
  { label: "value", value: "— Current phone string value." },
  { label: "placeholder", value: "— Optional placeholder text." },
  { label: "color", value: '— Ionic color token (e.g. "primary"). Optional.' },
  { label: "disabled", value: "— Disables the input. Defaults to false." },
  { label: "readonly", value: "— Makes the input read-only. Defaults to false." },
  { label: "clear_input", value: "— Shows a clear button. Defaults to false." },
  { label: "on_change", value: "— Callback receiving the updated phone string." },
  { label: "on_blur", value: "— Optional callback when the input loses focus." },
];

export function PhoneInputSection() {
  const [value, set_value] = useState("");

  return (
    <ComponentSection
      title="PhoneInput"
      description="An Australian phone number input with Maskito masking (+61 format)."
      props={props}
    >
      <PhoneInput
        label="Mobile"
        value={value}
        placeholder="+61 4XX XXX XXX"
        on_change={set_value}
        clear_input
      />
      <PhoneInput
        label="Disabled"
        value=""
        placeholder="+61 4XX XXX XXX"
        disabled
        on_change={() => {}}
      />
    </ComponentSection>
  );
}
