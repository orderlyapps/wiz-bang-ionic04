import { useState } from "react";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "label", value: "— Display label for the input." },
  { label: "value", value: '— Current date value as a "yyyy-mm-dd" string.' },
  { label: "disabled", value: "— Disables the input. Defaults to false." },
  { label: "on_change", value: '— Callback receiving the updated date as a "yyyy-mm-dd" string.' },
];

export function DateInputSection() {
  const [value, set_value] = useState("");

  return (
    <ComponentSection
      title="DateInput"
      description='A date picker wrapped in InputWrapper. Receives and outputs dates as "yyyy-mm-dd" strings.'
      props={props}
    >
      <DateInput label="Date of birth" value={value} on_change={set_value} />
      <DateInput label="Disabled" value="" disabled on_change={() => {}} />
    </ComponentSection>
  );
}
