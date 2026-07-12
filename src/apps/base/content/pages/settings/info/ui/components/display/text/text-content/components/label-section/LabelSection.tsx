import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Label } from "@ui/components/display/text/label/Label";
import { Space } from "@ui/components/layout/space/Space";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "children", value: "— The label text content." },
  { label: "color", value: "— Ionic color token. Optional." },
  { label: "size", value: '— Font size. One of xs | sm | md | lg | xl | 2xl. Defaults to "sm".' },
  { label: "bold", value: "— Whether to render bold text. Defaults to true." },
  { label: "italic", value: "— Whether to render italic text. Defaults to false." },
  { label: "className", value: "— Additional CSS class names. Optional." },
];

export function LabelSection() {
  return (
    <>
      <ComponentSection
        title="Label"
        description='A styled variant of Body for field labels and captions. Defaults to size "sm" and bold text.'
        props={props}
      >
        <IonItem lines="none">
          <IonLabel>
            <Label>Field label</Label>
          </IonLabel>
          <Body>— Some value</Body>
        </IonItem>
      </ComponentSection>

      <Space />
    </>
  );
}
