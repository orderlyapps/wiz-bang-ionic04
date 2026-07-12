import { IonItem } from "@ionic/react";
import { EditIconButton } from "@ui/components/inputs/button/icon/edit/EditIconButton";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

export function EditIconButtonSection() {
  return (
    <ComponentSection
      title="EditIconButton"
      description="Icon-only button with a create/edit icon. Defaults to clear fill for toolbar placement."
      props={[
        { label: "color", value: "IonicColor - Button color theme" },
        { label: "fill", value: "'clear' | 'outline' | 'solid' | 'default' (default: 'clear')" },
        { label: "size", value: "'small' | 'default' | 'large' (default: 'default')" },
        { label: "disabled", value: "boolean (default: false)" },
        { label: "on_click", value: "() => void - Click handler (required)" },
      ]}
    >
      <IonItem>
        <EditIconButton on_click={() => console.log("edit")} />
      </IonItem>
    </ComponentSection>
  );
}
