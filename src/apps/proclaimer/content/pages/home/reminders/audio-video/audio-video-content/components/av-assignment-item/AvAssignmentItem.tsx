import { useState } from "react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { SmsIconButton } from "@ui/components/inputs/button/icon/sms/SmsIconButton";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getAvSmsTemplates, fillAvSmsTemplate } from "../../../shared/avSmsTemplate";
import type { AvSmsTemplate } from "../../../shared/avSmsTemplate";
import { SmsTemplateActionSheet } from "./components/sms-template-action-sheet/SmsTemplateActionSheet";

type AvAssignmentItemProps = {
  week_id: string;
  label: string;
  meeting: string;
  participant?: Publisher;
};

export function AvAssignmentItem({ week_id, label, meeting, participant }: AvAssignmentItemProps) {
  const [show_action_sheet, set_show_action_sheet] = useState(false);

  if (!participant) {
    return null;
  }

  const week_label = getTheocraticWeekLabel(week_id, {
    format: "week-range",
    useRelativeWeek: true,
    relativeWeekStyle: "append",
  });

  const first_name = participant.display_name ?? participant.first_name;

  const handle_template_select = (template: AvSmsTemplate) => {
    const sms_body = fillAvSmsTemplate(template.text, {
      first_name,
      label,
      meeting,
      week_label,
    });
    window.location.href = `sms:?&body=${encodeURIComponent(sms_body)}`;
  };

  return (
    <LabelValueItem
      label={label}
      value={getPublisherDisplayName(participant)}
      end_detail={
        <>
          <SmsIconButton on_click={() => set_show_action_sheet(true)} size="small" />
          <SmsTemplateActionSheet
            is_open={show_action_sheet}
            templates={getAvSmsTemplates()}
            on_select={handle_template_select}
            on_dismiss={() => set_show_action_sheet(false)}
          />
        </>
      }
    />
  );
}
