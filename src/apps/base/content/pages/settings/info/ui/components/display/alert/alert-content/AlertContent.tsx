import { ConfirmationAlertSection } from "@base-content/pages/settings/info/ui/components/display/alert/confirmation-alert-section/ConfirmationAlertSection";
import { IonAccordionGroup } from "@ionic/react";

export function AlertContent() {
  return (
    <IonAccordionGroup>
      <ConfirmationAlertSection />
    </IonAccordionGroup>
  );
}
