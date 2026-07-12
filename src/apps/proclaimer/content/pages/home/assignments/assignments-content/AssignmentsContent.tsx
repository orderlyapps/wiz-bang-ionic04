import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { useAssignments } from "../useAssignments";
import { groupAssignmentsByMonth } from "../groupAssignmentsByMonth";
import { AssignmentMonthGroup } from "../components/assignment-month-group/AssignmentMonthGroup";

export function AssignmentsContent() {
  const { assignments } = useAssignments();

  if (!assignments.length) {
    return (
      <IonList>
        <IonItem lines="none">
          <IonLabel>
            <Body>No assignments</Body>
          </IonLabel>
        </IonItem>
      </IonList>
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
