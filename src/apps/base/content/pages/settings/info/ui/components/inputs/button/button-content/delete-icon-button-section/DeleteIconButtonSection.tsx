import { IonItem } from "@ionic/react";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

export function DeleteIconButtonSection() {
  return (
    <ComponentSection
      title="DeleteIconButton"
      description="Trash icon button with built-in confirmation alert. Defaults to danger color and clear fill."
      props={[
        { label: "color", value: "IonicColor (default: 'danger')" },
        { label: "fill", value: "'clear' | 'outline' | 'solid' | 'default' (default: 'clear')" },
        { label: "size", value: "'small' | 'default' | 'large' (default: 'default')" },
        { label: "disabled", value: "boolean (default: false)" },
        { label: "alert_header", value: "string (default: 'Confirm Delete')" },
        { label: "alert_message", value: "string (default: 'Are you sure...')" },
        { label: "confirm_text", value: "string (default: 'Delete')" },
        { label: "cancel_text", value: "string (default: 'Cancel')" },
        { label: "on_click", value: "() => void - Called on confirm (required)" },
      ]}
    >
      <IonItem>
        <DeleteIconButton on_click={() => console.log("deleted")} />
      </IonItem>
    </ComponentSection>
  );
}
