import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import type { WeekGroup } from "../../groupCleaningByMonth";

interface CleaningWeekGroupProps {
  week: WeekGroup;
  group_map: Map<string, string>;
}

export function CleaningWeekGroup({ week, group_map }: CleaningWeekGroupProps) {
  return (
    <IonItem>
      <IonLabel>
        <Body>{week.week_label}</Body>
        {week.entries.map((entry) => (
          <span key={`${entry.type}-${entry.group_id}`}>
            <br />
            <Body size="sm" bold>
              {entry.type === "major" ? "Thorough" : "Light"}:{" "}
            </Body>
            <Body size="sm">{group_map.get(entry.group_id) ?? ""}</Body>
          </span>
        ))}
      </IonLabel>
    </IonItem>
  );
}
