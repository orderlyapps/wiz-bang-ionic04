import { IonActionSheet } from "@ionic/react";
import type { ActionSheetButton } from "@ionic/react";
import { chatbubbleOutline } from "ionicons/icons";
import type { WeekendMeetingSmsTemplate } from "../../../../../shared/weekendMeetingSmsTemplate";

interface SmsTemplateActionSheetProps {
  is_open: boolean;
  templates: WeekendMeetingSmsTemplate[];
  on_select: (template: WeekendMeetingSmsTemplate) => void;
  on_dismiss: () => void;
}

export function SmsTemplateActionSheet({
  is_open,
  templates,
  on_select,
  on_dismiss,
}: SmsTemplateActionSheetProps) {
  const buttons: ActionSheetButton<WeekendMeetingSmsTemplate>[] = templates.map((tpl) => ({
    text: tpl.name || "Untitled",
    icon: chatbubbleOutline,
    handler: () => on_select(tpl),
  }));

  buttons.push({ text: "Cancel", role: "cancel" });

  return (
    <IonActionSheet
      isOpen={is_open}
      header="Select SMS Template"
      onDidDismiss={on_dismiss}
      buttons={buttons}
    />
  );
}
