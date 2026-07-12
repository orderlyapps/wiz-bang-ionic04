import { IonList } from "@ionic/react";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import { useClamAssignments } from "../../hooks/use-clam-assignments/useClamAssignments";
import { ClamAssignmentSchool } from "../clam-assignment-school/ClamAssignmentSchool";
import type { MidweekAssignmentId } from "@shared/database/schemas/midweek-assignment";

type SchoolConfig = {
  key: string;
  label: string;
  chairman_id: MidweekAssignmentId;
};

const schools: SchoolConfig[] = [
  { key: "school_1", label: "Main Hall", chairman_id: "chairman_1" },
  { key: "school_2", label: "Second School", chairman_id: "chairman_2" },
  { key: "school_3", label: "Third School", chairman_id: "chairman_3" },
];

type ClamAssignmentListProps = {
  week_id: string;
};

export function ClamAssignmentList({ week_id }: ClamAssignmentListProps) {
  const { meeting, participant, has_school_2, has_school_3 } = useClamAssignments(week_id);
  const week_label = getTheocraticWeekLabel(week_id, { format: "week-range" });

  if (!meeting) {
    return null;
  }

  const active_schools = schools.filter(
    (_, index) => index === 0 || (index === 1 && has_school_2) || (index === 2 && has_school_3),
  );

  return (
    <IonList>
      {active_schools.map((school) => (
        <ClamAssignmentSchool
          key={school.key}
          week_label={week_label}
          school_key={school.key}
          school_label={school.label}
          chairman_id={school.chairman_id}
          meeting={meeting}
          participant={participant}
        />
      ))}
    </IonList>
  );
}
