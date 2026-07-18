import { useState } from "react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { SmsIconButton } from "@ui/components/inputs/button/icon/sms/SmsIconButton";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import type { Publisher } from "@shared/database/schemas/publisher";
import { fillWeekendMeetingSmsTemplate } from "../../../shared/weekendMeetingSmsTemplate";
import type { WeekendMeetingSmsTemplate } from "../../../shared/weekendMeetingSmsTemplate";
import { SmsTemplateActionSheet } from "./components/sms-template-action-sheet/SmsTemplateActionSheet";

type WeekendAssignmentItemProps = {
  week_id: string;
  label: string;
  participant?: Publisher;
  templates: WeekendMeetingSmsTemplate[];
};

export function WeekendAssignmentItem({
  week_id,
  label,
  participant,
  templates,
}: WeekendAssignmentItemProps) {
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

  const handle_template_select = (template: WeekendMeetingSmsTemplate) => {
    const sms_body = fillWeekendMeetingSmsTemplate(template.text, {
      first_name,
      label,
      week_label,
      outline_id: "",
      outline_theme: "",
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
            templates={templates}
            on_select={handle_template_select}
            on_dismiss={() => set_show_action_sheet(false)}
          />
        </>
      }
    />
  );
}
