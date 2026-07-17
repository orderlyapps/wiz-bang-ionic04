import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { PioneerHoursSettings } from "../../../ministry-time-content/components/pioneer-stats/adjust-hours-modal/PioneerHoursSettings";
import { DataManagement } from "./components/data-management/DataManagement";
import { SubmitMinistryTime } from "./components/submit-ministry-time/SubmitMinistryTime";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import { useAccordionState } from "@util/hooks/use-accordion-state/useAccordionState";

interface MinistryTimeSettingsModalProps {
  isOpen: boolean;
  on_close: () => void;
}

export function MinistryTimeSettingsModal({ isOpen, on_close }: MinistryTimeSettingsModalProps) {
  const { value, onIonChange } = useAccordionState(
    localStorageKeys.ministryTimeSettingsAccordion,
    "submit-time",
  );

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={on_close}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_close} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAccordionGroup value={value} onIonChange={onIonChange}>
          <IonAccordion value="submit-time">
            <IonItem slot="header">
              <IonLabel>
                <Heading>Submit Report</Heading>
              </IonLabel>
            </IonItem>
            <div slot="content">
              <SubmitMinistryTime />
            </div>
          </IonAccordion>
          <IonAccordion value="pioneer-hours">
            <IonItem slot="header">
              <IonLabel>
                <Heading>Hour Adjustment</Heading>
              </IonLabel>
            </IonItem>
            <div slot="content">
              <PioneerHoursSettings />
            </div>
          </IonAccordion>
          <IonAccordion value="data-management">
            <IonItem slot="header">
              <IonLabel>
                <Heading>Import/Export</Heading>
              </IonLabel>
            </IonItem>
            <div slot="content">
              <DataManagement />
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
    </ResponsiveModal>
  );
}
