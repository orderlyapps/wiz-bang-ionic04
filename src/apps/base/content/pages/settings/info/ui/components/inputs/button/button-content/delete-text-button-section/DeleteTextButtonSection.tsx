import { DeleteTextButton } from "@ui/components/inputs/button/text/delete/DeleteTextButton";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

export function DeleteTextButtonSection() {
  return (
    <ComponentSection
      title="DeleteTextButton"
      description="Delete button with built-in confirmation alert. Defaults to danger color for destructive actions."
      props={[
        { label: "label", value: "string (default: 'Delete')" },
        { label: "color", value: "IonicColor (default: 'danger')" },
        { label: "fill", value: "'clear' | 'outline' | 'solid' | 'default' (default: 'solid')" },
        { label: "size", value: "'small' | 'default' | 'large' (default: 'default')" },
        { label: "expand", value: "'block' | 'full' (default: 'full')" },
        { label: "disabled", value: "boolean (default: false)" },
        { label: "alert_header", value: "string (default: 'Confirm Delete')" },
        { label: "alert_message", value: "string (default: 'Are you sure...')" },
        { label: "confirm_text", value: "string (default: 'Delete')" },
        { label: "cancel_text", value: "string (default: 'Cancel')" },
        { label: "on_click", value: "() => void - Called on confirm (required)" },
      ]}
    >
      <DeleteTextButton on_click={() => console.log("deleted")} />
    </ComponentSection>
  );
}
