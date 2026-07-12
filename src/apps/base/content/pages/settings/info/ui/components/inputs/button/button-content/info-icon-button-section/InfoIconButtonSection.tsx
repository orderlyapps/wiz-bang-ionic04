import { IonItem } from "@ionic/react";
import { InfoIconButton } from "@ui/components/inputs/button/icon/info/InfoIconButton";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

export function InfoIconButtonSection() {
  return (
    <ComponentSection
      title="InfoIconButton"
      description="Icon-only button with an information circle icon. Defaults to clear fill for toolbar placement."
      props={[
        { label: "color", value: "IonicColor - Button color theme" },
        { label: "fill", value: "'clear' | 'outline' | 'solid' | 'default' (default: 'clear')" },
        { label: "size", value: "'small' | 'default' | 'large' (default: 'default')" },
        { label: "disabled", value: "boolean (default: false)" },
        { label: "on_click", value: "() => void - Click handler (required)" },
      ]}
    >
      <IonItem>
        <InfoIconButton on_click={() => console.log("info")} />
      </IonItem>
    </ComponentSection>
  );
}
