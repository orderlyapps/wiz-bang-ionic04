import { IndexSection } from "@base-content/pages/settings/info/ui/css/css-content/components/index-section/IndexSection";
import { UtilSection } from "@base-content/pages/settings/info/ui/css/css-content/components/util-section/UtilSection";
import { IonAccordionGroup } from "@ionic/react";

export function CssContent() {
  return (
    <IonAccordionGroup>
      <IndexSection />
      <UtilSection />
    </IonAccordionGroup>
  );
}
