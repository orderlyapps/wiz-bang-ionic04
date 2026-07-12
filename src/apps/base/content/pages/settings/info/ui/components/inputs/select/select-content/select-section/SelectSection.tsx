import { useState } from "react";
import { Select } from "@ui/components/inputs/select/Select";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "label", value: "— Display label for the select field." },
  { label: "value", value: "— Current value (string, string[], or null)." },
  { label: "options", value: "— Array of { label, value } option objects." },
  { label: "placeholder", value: "— Optional placeholder text." },
  { label: "color", value: '— Ionic color token (e.g. "primary", "danger"). Optional.' },
  { label: "disabled", value: "— Disable the select. Defaults to false." },
  { label: "multiple", value: "— Allow multiple selections. Defaults to false." },
  {
    label: "interface_type",
    value: '— Interface style: "alert", "popover", "action-sheet". Defaults to "alert".',
  },
  { label: "on_change", value: "— Callback when value changes (receives value)." },
];

export function SelectSection() {
  const [country, set_country] = useState<string>("us");
  const [fruits, set_fruits] = useState<string[] | null>(null);
  const [disabled_value, set_disabled_value] = useState<string>("");

  return (
    <ComponentSection
      title="Select"
      description="A reusable dropdown select component built on IonSelect. Supports single and multiple selection with customizable interface styles."
      props={props}
    >
      <Select
        label="Country (Popover)"
        value={country}
        placeholder="Select a country"
        options={[
          { label: "United States", value: "us" },
          { label: "Canada", value: "ca" },
          { label: "United Kingdom", value: "uk" },
          { label: "Australia", value: "au" },
        ]}
        on_change={(value) => set_country(value as string)}
        interface_type="popover"
      />

      <Select
        label="Fruits (Multiple)"
        value={fruits}
        placeholder="Select fruits"
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
          { label: "Orange", value: "orange" },
        ]}
        multiple
        on_change={(value) => set_fruits(value as string[] | null)}
      />

      <Select
        label="Disabled"
        value={disabled_value}
        placeholder="Cannot select"
        options={[
          { label: "Option 1", value: "1" },
          { label: "Option 2", value: "2" },
        ]}
        disabled
        on_change={(value) => set_disabled_value(value as string)}
      />

      <Select
        label="With Color (Action Sheet)"
        value="success"
        options={[
          { label: "Success", value: "success" },
          { label: "Warning", value: "warning" },
          { label: "Danger", value: "danger" },
        ]}
        color="success"
        on_change={() => {}}
        interface_type="action-sheet"
      />
    </ComponentSection>
  );
}
