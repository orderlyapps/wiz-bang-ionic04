import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import type {
  CleaningMonth,
  CleaningScheduleOption,
} from "../use-cleaning-schedules/useCleaningSchedules";
import { CleaningWeekCard } from "../cleaning-week-card/CleaningWeekCard";
import { Fragment } from "react";
import { IonItemDivider } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";

interface CleaningScheduleListProps {
  months: CleaningMonth[];
  group_options: CleaningScheduleOption[];
  can_edit: boolean;
  on_major_change: (week_id: string, group_id: string) => void;
  on_minor_change: (week_id: string, group_id: string) => void;
}

export function CleaningScheduleList({
  months,
  group_options,
  can_edit,
  on_major_change,
  on_minor_change,
}: CleaningScheduleListProps) {
  if (months.length === 0) {
    return <Body>No cleaning weeks available.</Body>;
  }

  return (
    <>
      {months.map((month) => (
        <Fragment key={month.label}>
          <IonItemDivider sticky className="ion-padding-vertical">
            <Heading>{month.label.toUpperCase()}</Heading>
          </IonItemDivider>
          <Space size="sm" />
          {month.weeks.map((week) => (
            <div key={week.week_id}>
              <CleaningWeekCard
                week={week}
                group_options={group_options}
                can_edit={can_edit}
                on_major_change={(group_id) => on_major_change(week.week_id, group_id)}
                on_minor_change={(group_id) => on_minor_change(week.week_id, group_id)}
              />
              <Space size="sm" />
            </div>
          ))}
          <Space size="lg" />
        </Fragment>
      ))}
    </>
  );
}
