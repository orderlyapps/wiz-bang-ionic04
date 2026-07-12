import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@shared/database/schemas/event";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";

interface MemorialItemProps {
  event: EventRow;
  edit_href?: string;
}

export function MemorialItem({ event, edit_href }: MemorialItemProps) {
  return (
    <LabelValueItem
      label={getTheocraticWeekLabel(event.start_date, {
        format: "event-date",
        end_date: event.end_date,
      })}
      value="Memorial"
      router_link={edit_href}
    />
  );
}
