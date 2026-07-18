import { useState } from "react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { SmsIconButton } from "@ui/components/inputs/button/icon/sms/SmsIconButton";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { Outline } from "@shared/database/schemas/outline";
import { fillWeekendMeetingSmsTemplate } from "../../../shared/weekendMeetingSmsTemplate";
import type { WeekendMeetingSmsTemplate } from "../../../shared/weekendMeetingSmsTemplate";
import { SmsTemplateActionSheet } from "../weekend-assignment-item/components/sms-template-action-sheet/SmsTemplateActionSheet";

type SpeakerAssignmentItemProps = {
  week_id: string;
  speaker: Publisher;
  outline?: Outline;
  templates: WeekendMeetingSmsTemplate[];
};

export function SpeakerAssignmentItem({
  week_id,
  speaker,
  outline,
  templates,
}: SpeakerAssignmentItemProps) {
  const [show_action_sheet, set_show_action_sheet] = useState(false);

  const week_label = getTheocraticWeekLabel(week_id, {
    format: "week-range",
    useRelativeWeek: true,
    relativeWeekStyle: "append",
  });

  const first_name = speaker.display_name ?? speaker.first_name;

  const handle_template_select = (template: WeekendMeetingSmsTemplate) => {
    const sms_body = fillWeekendMeetingSmsTemplate(template.text, {
      first_name,
      label: "Public Talk Speaker",
      week_label,
      outline_id: outline?.id ?? "",
      outline_theme: outline?.theme ?? "",
    });
    window.location.href = `sms:?&body=${encodeURIComponent(sms_body)}`;
  };

  const outline_label = outline ? `${outline.id}: ${outline.theme}` : undefined;

  return (
    <>
      <LabelValueItem
        label="Public Talk Speaker"
        value={getPublisherDisplayName(speaker)}
        value_2={outline_label}
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
    </>
  );
}
