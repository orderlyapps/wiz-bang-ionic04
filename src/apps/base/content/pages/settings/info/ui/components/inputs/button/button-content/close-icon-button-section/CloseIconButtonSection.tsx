import { IonItem } from "@ionic/react";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

export function CloseIconButtonSection() {
  return (
    <ComponentSection
      title="CloseIconButton"
      description="Close icon button with built-in confirmation alert. Useful for closing modals or forms with unsaved changes."
      props={[
        { label: "color", value: "IonicColor - Button color theme" },
        { label: "fill", value: "'clear' | 'outline' | 'solid' | 'default' (default: 'clear')" },
        { label: "size", value: "'small' | 'default' | 'large' (default: 'default')" },
        { label: "disabled", value: "boolean (default: false)" },
        { label: "alert_header", value: "string (default: 'Confirm Close')" },
        { label: "alert_message", value: "string (default: 'Are you sure...unsaved changes')" },
        { label: "confirm_text", value: "string (default: 'Close')" },
        { label: "cancel_text", value: "string (default: 'Cancel')" },
        { label: "on_click", value: "() => void - Called on confirm (required)" },
      ]}
    >
      <IonItem>
        <CloseIconButton on_click={() => console.log("closed")} />
      </IonItem>
    </ComponentSection>
  );
}
