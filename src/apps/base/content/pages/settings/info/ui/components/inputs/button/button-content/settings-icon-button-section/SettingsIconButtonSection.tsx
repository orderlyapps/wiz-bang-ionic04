import { IonItem } from "@ionic/react";
import { SettingsIconButton } from "@ui/components/inputs/button/icon/settings/SettingsIconButton";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

export function SettingsIconButtonSection() {
  return (
    <ComponentSection
      title="SettingsIconButton"
      description="Icon-only button with a settings icon. Defaults to clear fill for toolbar placement."
      props={[
        { label: "color", value: "IonicColor - Button color theme" },
        { label: "fill", value: "'clear' | 'outline' | 'solid' | 'default' (default: 'clear')" },
        { label: "size", value: "'small' | 'default' | 'large' (default: 'default')" },
        { label: "disabled", value: "boolean (default: false)" },
        { label: "on_click", value: "() => void - Click handler (required)" },
      ]}
    >
      <IonItem>
        <SettingsIconButton on_click={() => console.log("settings")} />
      </IonItem>
    </ComponentSection>
  );
}
