import { IonAccordionGroup } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "label", value: "— The text displayed in the list item." },
  { label: "to", value: "— The route path to navigate to when tapped." },
];

export function NavigationContent() {
  return (
    <IonAccordionGroup>
      <ComponentSection
        title="Nav Item"
        description="A tappable list item used for navigating to a child route. Renders a label on the left and a chevron icon on the right."
        props={props}
      >
        <NavItem label="Example" to="/settings/info/ui/components" />
      </ComponentSection>
    </IonAccordionGroup>
  );
}
