import { IonAccordionGroup } from "@ionic/react";
import { ModalMultiSelectSection } from "@base-content/pages/settings/info/ui/components/inputs/modal-multi-select/modal-multi-select-content/modal-multi-select-section/ModalMultiSelectSection";

export function ModalMultiSelectContent() {
  return (
    <IonAccordionGroup>
      <ModalMultiSelectSection />
    </IonAccordionGroup>
  );
}
