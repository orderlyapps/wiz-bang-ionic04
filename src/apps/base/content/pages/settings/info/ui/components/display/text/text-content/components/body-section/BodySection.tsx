import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";
import { IonItem } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";

const props = [
  { label: "children", value: "— The text content to display." },
  { label: "color", value: '— Ionic color token (e.g. "primary", "danger"). Optional.' },
  {
    label: "size",
    value: '— Font size. One of xs | sm | md | lg | xl | 2xl. Defaults to "md".',
  },
  { label: "bold", value: "— Whether to render bold text. Defaults to false." },
  { label: "italic", value: "— Whether to render italic text. Defaults to false." },
  { label: "className", value: "— Additional CSS class names. Optional." },
];

export function BodySection() {
  return (
    <ComponentSection
      title="Body"
      description="A general-purpose inline text component built on IonText. Supports configurable size, color, weight, and style."
      props={props}
    >
      <IonItem lines="none">
        <Body size="sm" color="medium">
          Small medium body
        </Body>
      </IonItem>
      <IonItem lines="none">
        <Body bold>Bold body</Body>
      </IonItem>
      <IonItem lines="none">
        <Body italic color="primary">
          Italic primary body
        </Body>
      </IonItem>
    </ComponentSection>
  );
}
