import { IonItem } from "@ionic/react";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

export function AddIconButtonSection() {
  return (
    <ComponentSection
      title="AddIconButton"
      description="Icon-only button with a plus icon. Defaults to clear fill for toolbar placement."
      props={[
        { label: "color", value: "IonicColor - Button color theme" },
        { label: "fill", value: "'clear' | 'outline' | 'solid' | 'default' (default: 'clear')" },
        { label: "size", value: "'small' | 'default' | 'large' (default: 'default')" },
        { label: "disabled", value: "boolean (default: false)" },
        { label: "on_click", value: "() => void - Click handler (required)" },
      ]}
    >
      <IonItem>
        <AddIconButton on_click={() => console.log("added")} />
      </IonItem>
    </ComponentSection>
  );
}
