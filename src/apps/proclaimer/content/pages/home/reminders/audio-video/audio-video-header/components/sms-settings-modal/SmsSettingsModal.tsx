import { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonList,
  IonButton,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { TextareaInput } from "@ui/components/inputs/textarea/TextareaInput";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import {
  DEFAULT_AV_SMS_TEMPLATE,
  AV_SMS_PLACEHOLDERS,
  getAvSmsTemplate,
  saveAvSmsTemplate,
} from "../../../shared/avSmsTemplate";

interface SmsSettingsModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function SmsSettingsModal({ is_open, on_dismiss }: SmsSettingsModalProps) {
  const [template, set_template] = useState(() => getAvSmsTemplate());

  function handle_change(value: string) {
    set_template(value);
    saveAvSmsTemplate(value);
  }

  function handle_reset() {
    set_template(DEFAULT_AV_SMS_TEMPLATE);
    saveAvSmsTemplate(DEFAULT_AV_SMS_TEMPLATE);
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SMS Template</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <TextareaInput
            label="Default SMS Text"
            value={template}
            rows={5}
            on_change={handle_change}
          />
        </IonList>
        <Space size="sm" />
        <Body size="sm" color="medium">
          Available placeholders: {AV_SMS_PLACEHOLDERS.join(", ")}
        </Body>
        <Space size="sm" />
        <IonButton fill="clear" color="warning" onClick={handle_reset}>
          Reset to default
        </IonButton>
      </IonContent>
    </ResponsiveModal>
  );
}
