import { IonAccordionGroup, IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { CssSection } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/components/css-section/CssSection";
import { HelperSection } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/components/helper-section/HelperSection";
import { TypesSection } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/components/types-section/TypesSection";

export function IonicContent() {
  return (
    <>
      <IonItem lines="none">
        <IonLabel>
          <Body>
            The <code>src/util/vendor/ionic</code> module serves as the centralized Ionic React
            configuration and utility system for the application.
          </Body>
        </IonLabel>
      </IonItem>

      <Space size="md" />

      <IonAccordionGroup>
        <CssSection />
        <HelperSection />
        <TypesSection />
      </IonAccordionGroup>
    </>
  );
}
