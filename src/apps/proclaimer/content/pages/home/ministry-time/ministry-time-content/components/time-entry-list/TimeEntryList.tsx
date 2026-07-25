import { Fragment, useState } from "react";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import type { MinistryTimeEntry } from "../../hooks/useMinistryTime";
import { MonthNavigation } from "./components/month-navigation/MonthNavigation";
import { Space } from "@ui/components/layout/space/Space";

const CREDIT_TYPES = ["ldc", "bethel", "hlc", "school"];
const MONTHLY_HOUR_CAP = 55;

interface TimeEntryListProps {
  entries: MinistryTimeEntry[];
  on_delete: (id: string) => void;
  on_edit: (entry: MinistryTimeEntry) => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
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

function getFirstMondayOfMonth(yearMonth: string): Date {
  const [year, month] = yearMonth.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const dayOfWeek = firstDay.getDay();
  const daysUntilMonday = dayOfWeek === 1 ? 0 : (8 - dayOfWeek) % 7;
  return new Date(year, month - 1, 1 + daysUntilMonday);
}

function formatWeekRange(start: Date, end: Date): string {
  const fmtStart = start.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const fmtEnd = end.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return `${fmtStart} – ${fmtEnd}`;
}

interface WeekGroup {
  start_date: Date;
  end_date: Date;
  entries: MinistryTimeEntry[];
}

function groupEntriesByWeek(entries: MinistryTimeEntry[], yearMonth: string) {
  const firstMonday = getFirstMondayOfMonth(yearMonth);
  const sorted = [...entries].sort((a, b) => {
    const dateCmp = a.date.localeCompare(b.date);
    if (dateCmp !== 0) return dateCmp;
    return a.start_time.localeCompare(b.start_time);
  });

  const pre_week: MinistryTimeEntry[] = [];
  const weeks: WeekGroup[] = [];

  for (const entry of sorted) {
    const entryDate = new Date(entry.date + "T00:00:00");

    if (entryDate < firstMonday) {
      pre_week.push(entry);
      continue;
    }

    const daysSinceFirstMonday = Math.floor(
      (entryDate.getTime() - firstMonday.getTime()) / 86_400_000,
    );
    const weekIndex = Math.floor(daysSinceFirstMonday / 7);

    if (!weeks[weekIndex]) {
      const startDate = new Date(firstMonday);
      startDate.setDate(firstMonday.getDate() + weekIndex * 7);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      weeks[weekIndex] = { start_date: startDate, end_date: endDate, entries: [] };
    }
    weeks[weekIndex].entries.push(entry);
  }

  return { pre_week, weeks };
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
          {(() => {
            const { pre_week, weeks } = groupEntriesByWeek(monthEntries, selectedMonth);
            return (
              <>
                {pre_week.map((entry) => (
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
                {weeks.map((week) => (
                  <Fragment key={week.start_date.toISOString()}>
                    <Space />
                    <IonItem>
                      <Heading>{formatWeekRange(week.start_date, week.end_date)}</Heading>
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
                  </Fragment>
                ))}
                <Space size="2xl" />
              </>
            );
          })()}
        </IonList>
      )}
    </>
  );
}
