import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

export function SaveTextButtonSection() {
  return (
    <ComponentSection
      title="SaveTextButton"
      description="Save/update button with built-in confirmation alert. Use the variant prop to switch between save and update modes."
      props={[
        { label: "variant", value: "'save' | 'update' (default: 'save')" },
        { label: "label", value: "string (default: 'Save' or 'Update' based on variant)" },
        { label: "color", value: "IonicColor (default: 'primary')" },
        { label: "fill", value: "'clear' | 'outline' | 'solid' | 'default' (default: 'solid')" },
        { label: "size", value: "'small' | 'default' | 'large' (default: 'default')" },
        { label: "expand", value: "'block' | 'full' (default: 'block')" },
        { label: "disabled", value: "boolean (default: false)" },
        { label: "alert_header", value: "string (default: 'Confirm Save' or 'Confirm Update')" },
        { label: "alert_message", value: "string (default: 'Are you sure...')" },
        { label: "confirm_text", value: "string (default: matches label)" },
        { label: "cancel_text", value: "string (default: 'Cancel')" },
        { label: "on_click", value: "() => void - Called on confirm (required)" },
      ]}
    >
      <SaveTextButton on_click={() => console.log("saved")} />
      <SaveTextButton variant="update" on_click={() => console.log("updated")} />
    </ComponentSection>
  );
}
