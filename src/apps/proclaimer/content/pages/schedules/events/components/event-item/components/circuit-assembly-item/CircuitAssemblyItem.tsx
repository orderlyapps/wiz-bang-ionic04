import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@shared/database/schemas/event";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";

interface CircuitAssemblyItemProps {
  event: EventRow;
  edit_href?: string;
}

export function CircuitAssemblyItem({ event, edit_href }: CircuitAssemblyItemProps) {
  return (
    <LabelValueItem
      label={getTheocraticWeekLabel(event.start_date, {
        format: "event-date",
        end_date: event.end_date,
      })}
      value="Circuit Assembly"
      value_2={event.name || undefined}
      router_link={edit_href}
    />
  );
}
