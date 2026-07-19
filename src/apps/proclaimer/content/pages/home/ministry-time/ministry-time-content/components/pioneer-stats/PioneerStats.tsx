import { IonGrid, IonRow, IonCol } from "@ionic/react";
import type { MinistryTimeEntry } from "../../hooks/useMinistryTime";
import { usePioneerStats } from "../../hooks/usePioneerStats";
import { StatItem } from "./stat-item/StatItem";
import { Space } from "@ui/components/layout/space/Space";

interface PioneerStatsProps {
  entries: MinistryTimeEntry[];
}

export function PioneerStats({ entries }: PioneerStatsProps) {
  const stats = usePioneerStats(entries);
  if (!stats) return null;

  if (stats.type === "regular_pioneer") {
    return (
      <IonGrid class="ion-no-padding">
        <IonRow>
          <IonCol>
            <StatItem
              label="Hours Remaining"
              value={`${stats.raw_hours_remaining?.toFixed(1)}h${
                stats.raw_hours_remaining !== stats.hours_remaining
                  ? ` (${stats.hours_remaining?.toFixed(1)}h)`
                  : ""
              }`}
            />
          </IonCol>
          <IonCol>
            <StatItem label="Avg / Week" value={`${stats.avg_per_week?.toFixed(1)}h`} />
          </IonCol>
        </IonRow>
        <Space size="xs" />
        <IonRow>
          <IonCol>
            <StatItem label="Avg / Month" value={`${stats.avg_per_month?.toFixed(1)}h`} />
          </IonCol>
          <IonCol>
            <StatItem
              label="Needed This Month"
              value={`${stats.hours_needed_this_month_for_avg?.toFixed(1)}h`}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    );
  }

  const monthly_target = stats.type === "special_pioneer" ? "100h" : "30h";
  return (
    <IonGrid class="ion-no-padding">
      <IonRow>
        <IonCol>
          <StatItem
            label={`Needed This Month (${monthly_target})`}
            value={`${stats.hours_needed_this_month.toFixed(1)}h`}
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
