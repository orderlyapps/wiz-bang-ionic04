import { AddIconButtonSection } from "@base-content/pages/settings/info/ui/components/inputs/button/button-content/add-icon-button-section/AddIconButtonSection";
import { CloseIconButtonSection } from "@base-content/pages/settings/info/ui/components/inputs/button/button-content/close-icon-button-section/CloseIconButtonSection";
import { DeleteIconButtonSection } from "@base-content/pages/settings/info/ui/components/inputs/button/button-content/delete-icon-button-section/DeleteIconButtonSection";
import { DeleteTextButtonSection } from "@base-content/pages/settings/info/ui/components/inputs/button/button-content/delete-text-button-section/DeleteTextButtonSection";
import { EditIconButtonSection } from "@base-content/pages/settings/info/ui/components/inputs/button/button-content/edit-icon-button-section/EditIconButtonSection";
import { InfoIconButtonSection } from "@base-content/pages/settings/info/ui/components/inputs/button/button-content/info-icon-button-section/InfoIconButtonSection";
import { SaveIconButtonSection } from "@base-content/pages/settings/info/ui/components/inputs/button/button-content/save-icon-button-section/SaveIconButtonSection";
import { SaveTextButtonSection } from "@base-content/pages/settings/info/ui/components/inputs/button/button-content/save-text-button-section/SaveTextButtonSection";
import { SettingsIconButtonSection } from "@base-content/pages/settings/info/ui/components/inputs/button/button-content/settings-icon-button-section/SettingsIconButtonSection";
import { TextButtonSection } from "@base-content/pages/settings/info/ui/components/inputs/button/button-content/text-button-section/TextButtonSection";
import { IonAccordionGroup } from "@ionic/react";

export function ButtonContent() {
  return (
    <IonAccordionGroup>
      <TextButtonSection />
      <DeleteTextButtonSection />
      <SaveTextButtonSection />
      <AddIconButtonSection />
      <CloseIconButtonSection />
      <DeleteIconButtonSection />
      <SaveIconButtonSection />
      <EditIconButtonSection />
      <SettingsIconButtonSection />
      <InfoIconButtonSection />
    </IonAccordionGroup>
  );
}
