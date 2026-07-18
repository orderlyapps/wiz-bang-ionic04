import { IonItemDivider, IonList } from "@ionic/react";
import {
  avAssignmentLabels,
  midweekAVAssignmentIDs,
  midweekAttendantAssignmentIDs,
  weekendAVAssignmentIDs,
  weekendAttendantAssignmentIDs,
} from "@shared/database/schemas/av-assignment";
import type { AvAssignmentID } from "@shared/database/schemas/av-assignment";
import { useAvAssignments } from "../../hooks/use-av-assignments/useAvAssignments";
import { AvAssignmentItem } from "../av-assignment-item/AvAssignmentItem";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";

type AvAssignmentListProps = {
  week_id: string;
};

function AssignmentSection({
  week_id,
  title,
  meeting,
  assignment_ids,
  participant,
}: {
  week_id: string;
  title: string;
  meeting: string;
  assignment_ids: readonly AvAssignmentID[];
  participant: (
    assignment_id: AvAssignmentID,
  ) => ReturnType<ReturnType<typeof useAvAssignments>["participant"]>;
}) {
  return (
    <>
      <IonItemDivider sticky className="ion-padding">
        <Heading>{title}</Heading>
      </IonItemDivider>
      {assignment_ids.map((id) => (
        <AvAssignmentItem
          key={id}
          week_id={week_id}
          label={avAssignmentLabels[id]}
          meeting={meeting}
          participant={participant(id)}
        />
      ))}
      <Space />
    </>
  );
}

export function AvAssignmentList({ week_id }: AvAssignmentListProps) {
  const { participant } = useAvAssignments(week_id);

  return (
    <IonList>
      <AssignmentSection
        week_id={week_id}
        title="Midweek Meeting — AV"
        meeting="midweek"
        assignment_ids={midweekAVAssignmentIDs}
        participant={participant}
      />
      <AssignmentSection
        week_id={week_id}
        title="Midweek Meeting — Attendants"
        meeting="midweek"
        assignment_ids={midweekAttendantAssignmentIDs}
        participant={participant}
      />
      <AssignmentSection
        week_id={week_id}
        title="Weekend Meeting — AV"
        meeting="weekend"
        assignment_ids={weekendAVAssignmentIDs}
        participant={participant}
      />
      <AssignmentSection
        week_id={week_id}
        title="Weekend Meeting — Attendants"
        meeting="weekend"
        assignment_ids={weekendAttendantAssignmentIDs}
        participant={participant}
      />
    </IonList>
  );
}
