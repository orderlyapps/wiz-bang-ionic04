import { IonItem } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "children", value: "— The heading text content." },
  { label: "color", value: "— Ionic color token. Optional." },
  { label: "size", value: '— Font size. One of xs | sm | md | lg | xl | 2xl. Defaults to "lg".' },
  { label: "bold", value: "— Whether to render bold text. Defaults to true." },
  { label: "italic", value: "— Whether to render italic text. Defaults to false." },
  { label: "className", value: "— Additional CSS class names. Optional." },
];

export function HeadingSection() {
  return (
    <ComponentSection
      title="Heading"
      description='A styled variant of Body for section headings. Defaults to size "lg" and bold text.'
      props={props}
    >
      <IonItem lines="none">
        <Heading>Default heading</Heading>
      </IonItem>
      <IonItem lines="none">
        <Heading size="xl" color="warning">
          XL warning heading
        </Heading>
      </IonItem>
    </ComponentSection>
  );
}
