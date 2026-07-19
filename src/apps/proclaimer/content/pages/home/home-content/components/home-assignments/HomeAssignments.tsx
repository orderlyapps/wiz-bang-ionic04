import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { useAssignments } from "@proclaimer-content/pages/home/assignments/useAssignments";
import { AssignmentItem } from "@proclaimer-content/pages/home/assignments/components/assignment-item/AssignmentItem";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import { useAccordionState } from "@util/hooks/use-accordion-state/useAccordionState";

export function HomeAssignments() {
  const { assignments, is_loading } = useAssignments();
  const { value, onIonChange } = useAccordionState(
    localStorageKeys.homeAssignmentsAccordion,
    "assignments",
  );

  if (is_loading) {
    return <Spinner className="flex-center" />;
  }

  const upcoming_assignments = assignments.slice(0, 3);

  if (!upcoming_assignments.length) {
    return null;
  }

  return (
    <IonAccordionGroup value={value} onIonChange={onIonChange}>
      <IonAccordion value="assignments">
        <IonItem slot="header">
          <IonLabel>
            <Heading>Assignments</Heading>
          </IonLabel>
        </IonItem>
        <div slot="content">
          <IonList>
            {upcoming_assignments.map((assignment) => (
              <AssignmentItem key={assignment.id} assignment={assignment} />
            ))}
          </IonList>
          {assignments.length > 3 && (
            <NavItem
              label="See more"
              to="/home/assignments"
              label_class="ion-text-end"
              size="sm"
              lines="none"
            />
          )}
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
}
