import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { SmsIconButton } from "@ui/components/inputs/button/icon/sms/SmsIconButton";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getAvSmsTemplate, fillAvSmsTemplate } from "../../../shared/avSmsTemplate";

type AvAssignmentItemProps = {
  week_id: string;
  label: string;
  meeting: string;
  participant?: Publisher;
};

export function AvAssignmentItem({ week_id, label, meeting, participant }: AvAssignmentItemProps) {
  if (!participant) {
    return null;
  }

  const week_label = getTheocraticWeekLabel(week_id, {
    format: "week-range",
    useRelativeWeek: true,
    relativeWeekStyle: "append",
  });

  const first_name = participant.display_name ?? participant.first_name;

  const handle_sms = () => {
    const sms_body = fillAvSmsTemplate(getAvSmsTemplate(), {
      first_name,
      label,
      meeting,
      week_label,
    });
    window.location.href = `sms:?&body=${encodeURIComponent(sms_body)}`;
  };

  return (
    <IonItem>
      <IonLabel>
        <Body bold>{label}</Body>
        <br />
        <Body size="sm" color="medium">
          {getPublisherDisplayName(participant)}
        </Body>
      </IonLabel>
      <SmsIconButton on_click={handle_sms} size="small" />
    </IonItem>
  );
}
