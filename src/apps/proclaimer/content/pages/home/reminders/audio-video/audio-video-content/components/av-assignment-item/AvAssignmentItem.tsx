import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { SmsIconButton } from "@ui/components/inputs/button/icon/sms/SmsIconButton";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import type { Publisher } from "@shared/database/schemas/publisher";

type AvAssignmentItemProps = {
  week_id: string;
  label: string;
  participant?: Publisher;
};

export function AvAssignmentItem({ week_id, label, participant }: AvAssignmentItemProps) {
  if (!participant) {
    return null;
  }

  const week_label = getTheocraticWeekLabel(week_id, {
    format: "week-range",
    useRelativeWeek: true,
    relativeWeekStyle: "append",
  });

  const first_name = participant.display_name ?? participant.first_name;

  const sms_body = `Hi ${first_name}, you have the ${label} assignment for the week of ${week_label}.`;

  const handle_sms = () => {
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
