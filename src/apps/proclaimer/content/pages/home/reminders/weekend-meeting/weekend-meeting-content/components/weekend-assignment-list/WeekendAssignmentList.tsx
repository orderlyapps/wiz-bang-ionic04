import { useEffect, useState } from "react";
import { IonItemDivider, IonList } from "@ionic/react";
import {
  weekendAssignmentIDs,
  weekendAssignmentLabels,
} from "@shared/database/schemas/weekend-assignment";
import type { WeekendAssignmentID } from "@shared/database/schemas/weekend-assignment";
import { useWeekendAssignments } from "../../hooks/use-weekend-assignments/useWeekendAssignments";
import { WeekendAssignmentItem } from "../weekend-assignment-item/WeekendAssignmentItem";
import { SpeakerAssignmentItem } from "../speaker-assignment-item/SpeakerAssignmentItem";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import {
  getWeekendMeetingSmsTemplates,
  WEEKEND_MEETING_SMS_TEMPLATES_CHANGED,
} from "../../../shared/weekendMeetingSmsTemplate";

type WeekendAssignmentListProps = {
  week_id: string;
};

export function WeekendAssignmentList({ week_id }: WeekendAssignmentListProps) {
  const { participant, speaker_assignment } = useWeekendAssignments(week_id);
  const [templates, set_templates] = useState(getWeekendMeetingSmsTemplates);

  useEffect(() => {
    function refresh() {
      set_templates(getWeekendMeetingSmsTemplates());
    }
    window.addEventListener(WEEKEND_MEETING_SMS_TEMPLATES_CHANGED, refresh);
    return () => window.removeEventListener(WEEKEND_MEETING_SMS_TEMPLATES_CHANGED, refresh);
  }, []);

  return (
    <IonList>
      <IonItemDivider sticky className="ion-padding">
        <Heading>Weekend Meeting</Heading>
      </IonItemDivider>
      {weekendAssignmentIDs.map((id: WeekendAssignmentID) => (
        <WeekendAssignmentItem
          key={id}
          week_id={week_id}
          label={weekendAssignmentLabels[id]}
          participant={participant(id)}
          templates={templates}
        />
      ))}
      {speaker_assignment?.speaker && (
        <SpeakerAssignmentItem
          week_id={week_id}
          speaker={speaker_assignment.speaker}
          outline={speaker_assignment.outline}
          templates={templates}
        />
      )}
      <Space />
    </IonList>
  );
}
