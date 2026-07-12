import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

export function TextButtonSection() {
  return (
    <ComponentSection
      title="TextButton"
      description="Standard text button with a configurable label and appearance."
      props={[
        { label: "label", value: "string - Button text (required)" },
        { label: "color", value: "IonicColor - Button color theme" },
        { label: "fill", value: "'clear' | 'outline' | 'solid' | 'default' (default: 'solid')" },
        { label: "size", value: "'small' | 'default' | 'large' (default: 'default')" },
        { label: "expand", value: "'block' | 'full' (default: 'full')" },
        { label: "disabled", value: "boolean (default: false)" },
        { label: "on_click", value: "() => void - Click handler (required)" },
      ]}
    >
      <TextButton label="Click Me" on_click={() => console.log("clicked")} />
    </ComponentSection>
  );
}
