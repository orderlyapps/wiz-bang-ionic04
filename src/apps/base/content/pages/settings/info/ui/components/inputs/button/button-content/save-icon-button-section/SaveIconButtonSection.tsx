import { IonItem } from "@ionic/react";
import { SaveIconButton } from "@ui/components/inputs/button/icon/save/SaveIconButton";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

export function SaveIconButtonSection() {
  return (
    <ComponentSection
      title="SaveIconButton"
      description="Save icon button with built-in confirmation alert. Defaults to primary color and clear fill."
      props={[
        { label: "color", value: "IonicColor (default: 'primary')" },
        { label: "fill", value: "'clear' | 'outline' | 'solid' | 'default' (default: 'clear')" },
        { label: "size", value: "'small' | 'default' | 'large' (default: 'default')" },
        { label: "disabled", value: "boolean (default: false)" },
        { label: "alert_header", value: "string (default: 'Confirm Save')" },
        { label: "alert_message", value: "string (default: 'Are you sure...')" },
        { label: "confirm_text", value: "string (default: 'Save')" },
        { label: "cancel_text", value: "string (default: 'Cancel')" },
        { label: "on_click", value: "() => void - Called on confirm (required)" },
      ]}
    >
      <IonItem>
        <SaveIconButton on_click={() => console.log("saved")} />
      </IonItem>
    </ComponentSection>
  );
}
