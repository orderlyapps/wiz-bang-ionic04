import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@shared/database/schemas/event";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";

interface CircuitVisitItemProps {
  event: EventRow;
  edit_href?: string;
}

export function CircuitVisitItem({ event, edit_href }: CircuitVisitItemProps) {
  return (
    <LabelValueItem
      label={getTheocraticWeekLabel(event.start_date, {
        format: "event-date",
        end_date: event.end_date,
      })}
      value="Circuit Overseer Visit"
      router_link={edit_href}
    />
  );
}
