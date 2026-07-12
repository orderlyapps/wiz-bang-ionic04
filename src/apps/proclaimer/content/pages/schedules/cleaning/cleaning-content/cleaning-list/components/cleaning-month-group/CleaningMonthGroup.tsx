import { IonList, IonListHeader } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import type { MonthGroup } from "../../groupCleaningByMonth";
import { CleaningWeekGroup } from "../cleaning-week-group/CleaningWeekGroup";

interface CleaningMonthGroupProps {
  group: MonthGroup;
  group_map: Map<string, string>;
}

export function CleaningMonthGroup({ group, group_map }: CleaningMonthGroupProps) {
  return (
    <IonList>
      <IonListHeader>
        <Body size="xl" color="primary">
          {group.label.toUpperCase()}
        </Body>
      </IonListHeader>
      {group.weeks.map((week) => (
        <CleaningWeekGroup key={week.week_id} week={week} group_map={group_map} />
      ))}
    </IonList>
  );
}
