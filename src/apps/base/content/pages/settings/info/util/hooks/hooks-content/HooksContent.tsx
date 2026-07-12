import { IonAccordionGroup } from "@ionic/react";
import { UseBreakpointSection } from "@base-content/pages/settings/info/util/hooks/components/use-breakpoint-section/UseBreakpointSection";

export function HooksContent() {
  return (
    <IonAccordionGroup>
      <UseBreakpointSection />
    </IonAccordionGroup>
  );
}
