import { useState } from "react";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "label", value: "— Display label for the input." },
  { label: "value", value: "— Current string value." },
  { label: "placeholder", value: "— Optional placeholder text." },
  { label: "color", value: '— Ionic color token (e.g. "primary"). Optional.' },
  { label: "disabled", value: "— Disables the input. Defaults to false." },
  { label: "readonly", value: "— Makes the input read-only. Defaults to false." },
  { label: "clear_input", value: "— Shows a clear button. Defaults to false." },
  { label: "max_length", value: "— Maximum character length. Optional." },
  { label: "on_change", value: "— Callback receiving the updated string value." },
  { label: "on_blur", value: "— Optional callback when the input loses focus." },
];

export function TextInputSection() {
  const [value, set_value] = useState("");
  const [readonly_value] = useState("Read only value");

  return (
    <ComponentSection
      title="TextInput"
      description="A text input wrapped in InputWrapper for consistent labelled styling."
      props={props}
    >
      <TextInput
        label="Name"
        value={value}
        placeholder="Enter name"
        on_change={set_value}
        clear_input
      />
      <TextInput
        label="Max 10 chars"
        value={value}
        placeholder="Max 10"
        max_length={10}
        on_change={set_value}
      />
      <TextInput
        label="Disabled"
        value=""
        placeholder="Cannot type"
        disabled
        on_change={() => {}}
      />
      <TextInput label="Read Only" value={readonly_value} readonly on_change={() => {}} />
    </ComponentSection>
  );
}
