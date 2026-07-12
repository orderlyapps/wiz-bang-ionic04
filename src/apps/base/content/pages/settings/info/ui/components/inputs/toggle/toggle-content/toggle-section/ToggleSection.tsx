import { useState } from "react";
import { ToggleInput } from "@ui/components/inputs/toggle/ToggleInput";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "label", value: "— Display label for the toggle." },
  { label: "checked", value: "— Current boolean state of the toggle." },
  { label: "color", value: '— Ionic color token (e.g. "primary", "danger"). Optional.' },
  { label: "disabled", value: "— Disable the toggle. Defaults to false." },
  { label: "on_change", value: "— Callback when value changes (receives boolean)." },
];

export function ToggleSection() {
  const [enabled, set_enabled] = useState(false);
  const [notifications, set_notifications] = useState(true);

  return (
    <ComponentSection
      title="Toggle"
      description="A reusable toggle switch component built on IonToggle. Supports controlled state with customizable color and disabled state."
      props={props}
    >
      <ToggleInput label="Enable Feature" checked={enabled} on_change={set_enabled} />

      <ToggleInput
        label="Notifications (Primary)"
        checked={notifications}
        color="primary"
        on_change={set_notifications}
      />

      <ToggleInput label="Disabled Off" checked={false} disabled on_change={() => {}} />

      <ToggleInput
        label="Disabled On (Danger)"
        checked={true}
        color="danger"
        disabled
        on_change={() => {}}
      />
    </ComponentSection>
  );
}
