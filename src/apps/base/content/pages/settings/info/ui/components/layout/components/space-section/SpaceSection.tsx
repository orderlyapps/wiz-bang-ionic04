import { IonItem } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  {
    label: "size",
    value:
      '— Amount of space. One of xs (0.5rem) | sm (1rem) | md (2.5rem) | lg (4rem) | xl (6rem) | 2xl (8rem). Defaults to "md".',
  },
  {
    label: "horizontal",
    value:
      "— When true, renders an inline-block element with the given width instead of a block element with the given height. Defaults to false.",
  },
];

export function SpaceSection() {
  return (
    <ComponentSection
      title="Space"
      description="A blank spacer element that inserts vertical (or horizontal) whitespace between layout sections. Renders an aria-hidden div."
      props={props}
    >
      <IonItem lines="none">
        <Body>size="sm"</Body>
      </IonItem>
      <Space size="sm" />
      <IonItem lines="none">
        <Body>size="md" (default)</Body>
      </IonItem>
      <Space size="md" />
      <IonItem lines="none">
        <Body>size="lg"</Body>
      </IonItem>
      <Space size="lg" />
    </ComponentSection>
  );
}
