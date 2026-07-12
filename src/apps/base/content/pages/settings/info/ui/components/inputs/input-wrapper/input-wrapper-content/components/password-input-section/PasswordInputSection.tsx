import { useState } from "react";
import { PasswordInput } from "@ui/components/inputs/password/PasswordInput";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "label", value: "— Display label for the input." },
  { label: "value", value: "— Current string value." },
  { label: "placeholder", value: "— Optional placeholder text." },
  { label: "color", value: '— Ionic color token (e.g. "primary"). Optional.' },
  { label: "disabled", value: "— Disables the input. Defaults to false." },
  { label: "readonly", value: "— Makes the input read-only. Defaults to false." },
  { label: "clear_input", value: "— Shows a clear button. Defaults to false." },
  { label: "on_change", value: "— Callback receiving the updated string value." },
  { label: "on_blur", value: "— Optional callback when the input loses focus." },
];

export function PasswordInputSection() {
  const [value, set_value] = useState("");

  return (
    <ComponentSection
      title="PasswordInput"
      description="A password input wrapped in InputWrapper for consistent labelled styling."
      props={props}
    >
      <PasswordInput
        label="Password"
        value={value}
        placeholder="Enter password"
        on_change={set_value}
        clear_input
      />
      <PasswordInput
        label="Disabled"
        value=""
        placeholder="Cannot type"
        disabled
        on_change={() => {}}
      />
    </ComponentSection>
  );
}
