import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { groupAssignmentsByMonth } from "@proclaimer-content/pages/home/assignments/groupAssignmentsByMonth";
import { AssignmentMonthGroup } from "@proclaimer-content/pages/home/assignments/components/assignment-month-group/AssignmentMonthGroup";
import { usePublisherAssignments } from "../hooks/usePublisherAssignments";

export function AssignmentsContent({ publisher_id }: { publisher_id: string }) {
  const { assignments } = usePublisherAssignments(publisher_id);

  if (!assignments.length) {
    return (
      <>
        <IonList>
          <IonItem lines="none">
            <IonLabel>
              <Body color="medium">No upcoming assignments</Body>
            </IonLabel>
          </IonItem>
        </IonList>
      </>
    );
  }

  const groups = groupAssignmentsByMonth(assignments);

  return (
    <>
      {groups.map((group) => (
        <AssignmentMonthGroup key={group.label} group={group} />
      ))}
      <Space />
    </>
  );
}
