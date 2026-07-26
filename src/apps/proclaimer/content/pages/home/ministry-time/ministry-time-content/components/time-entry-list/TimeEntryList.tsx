import { useState } from "react";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import type { MinistryTimeEntry } from "../../hooks/useMinistryTime";
import { MonthNavigation } from "./components/month-navigation/MonthNavigation";
import { Space } from "@ui/components/layout/space/Space";
import { groupEntriesByWeek, formatWeekRange } from "./week-grouping";

const CREDIT_TYPES = ["ldc", "bethel", "hlc", "school"];
const MONTHLY_HOUR_CAP = 55;

interface TimeEntryListProps {
  entries: MinistryTimeEntry[];
  on_delete: (id: string) => void;
  on_edit: (entry: MinistryTimeEntry) => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatMinutes(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function currentMonthStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function TimeEntryList({ entries, on_delete, on_edit }: TimeEntryListProps) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonthStr());
  const monthEntries = entries.filter((e) => e.date.startsWith(selectedMonth));

  const totalMinutes = monthEntries.reduce((sum, e) => sum + e.minutes, 0);

  const nonCreditMinutes = monthEntries
    .filter((e) => !CREDIT_TYPES.includes(e.ministry_type))
    .reduce((sum, e) => sum + e.minutes, 0);
  const creditMinutes = monthEntries
    .filter((e) => CREDIT_TYPES.includes(e.ministry_type))
    .reduce((sum, e) => sum + e.minutes, 0);
  const nonCreditHours = nonCreditMinutes / 60;
  const creditedMinutes =
    nonCreditHours >= MONTHLY_HOUR_CAP
      ? nonCreditMinutes
      : Math.min(MONTHLY_HOUR_CAP, nonCreditHours + creditMinutes / 60) * 60;

  return (
    <>
      <MonthNavigation month={selectedMonth} on_change={setSelectedMonth} />
      <IonItem lines="none" className="ion-text-center">
        <IonLabel>
          <Body color="medium" size="sm">
            Monthly Total
          </Body>
          <br />
          <Body color="medium" size="xl" bold>
            {formatMinutes(totalMinutes)}
            {totalMinutes !== creditedMinutes && ` (${formatMinutes(creditedMinutes)})`}
          </Body>
        </IonLabel>
      </IonItem>
      {monthEntries.length === 0 ? (
        <IonItem lines="none" className="ion-padding ion-text-center">
          <IonLabel>
            <Body color="medium">No entries for this month.</Body>
          </IonLabel>
        </IonItem>
      ) : (
        <IonList>
          {groupEntriesByWeek(monthEntries).map((week) => (
            <div key={week.week_start}>
              <IonItem color="primary">
                <IonLabel>
                  <Body size="lg">{formatWeekRange(week.week_start)}</Body>
                </IonLabel>
                <div slot="end">
                  <Body size="sm">{formatMinutes(week.total_minutes)}</Body>
                </div>
              </IonItem>
              {week.entries.map((entry) => (
                <LabelValueItem
                  key={entry.entry_id}
                  label={formatDate(entry.date)}
                  value={`${entry.start_time} – ${entry.end_time}`}
                  value_2={entry.note || undefined}
                  value_2_color="medium"
                  on_click={() => on_edit(entry)}
                  end_detail={
                    <>
                      <Body color="primary">{formatMinutes(entry.minutes)}</Body>
                      <DeleteIconButton
                        alert_header="Delete Entry"
                        alert_message="Delete this ministry time entry?"
                        on_click={() => on_delete(entry.entry_id)}
                      />
                    </>
                  }
                />
              ))}
              <Space />
            </div>
          ))}
          <Space size="2xl" />
        </IonList>
      )}
    </>
  );
}
