import { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonButton,
  IonIcon,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Space } from "@ui/components/layout/space/Space";
import { TemplateEditor } from "./components/template-editor/TemplateEditor";
import {
  type WeekendMeetingSmsTemplate,
  getWeekendMeetingSmsTemplates,
  saveWeekendMeetingSmsTemplates,
} from "../../../shared/weekendMeetingSmsTemplate";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";

interface SmsSettingsModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function SmsSettingsModal({ is_open, on_dismiss }: SmsSettingsModalProps) {
  const [templates, set_templates] = useState<WeekendMeetingSmsTemplate[]>(() =>
    getWeekendMeetingSmsTemplates(),
  );

  function persist(next: WeekendMeetingSmsTemplate[]) {
    set_templates(next);
    saveWeekendMeetingSmsTemplates(next);
  }

  function handle_template_change(index: number, next: WeekendMeetingSmsTemplate) {
    const updated = [...templates];
    updated[index] = next;
    persist(updated);
  }

  function handle_template_delete(index: number) {
    persist(templates.filter((_, i) => i !== index));
  }

  function handle_add() {
    persist([...templates, { name: `Template ${templates.length + 1}`, text: "" }]);
  }

  const can_delete = templates.length > 1;

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SMS Templates</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonAccordionGroup>
          {templates.map((tpl, i) => (
            <IonAccordion key={i} value={`tpl-${i}`}>
              <IonItem slot="header">
                <IonLabel>
                  <Heading>{tpl.name || `Template ${i + 1}`}</Heading>
                </IonLabel>
                {can_delete && (
                  <IonButton
                    slot="end"
                    fill="clear"
                    color="danger"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handle_template_delete(i);
                    }}
                  >
                    <IonIcon slot="icon-only" icon={trashOutline} />
                  </IonButton>
                )}
              </IonItem>
              <div slot="content">
                <TemplateEditor
                  index={i}
                  template={tpl}
                  on_change={(next) => handle_template_change(i, next)}
                />
              </div>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
        <Space size="xl" />
        <TextButton label="+ Add Template" fill="clear" on_click={handle_add}></TextButton>
      </IonContent>
    </ResponsiveModal>
  );
}
