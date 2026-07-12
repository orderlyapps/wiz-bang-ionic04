import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@shared/database/schemas/event";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";

interface SpecialMeetingItemProps {
  event: EventRow;
  edit_href?: string;
}

export function SpecialMeetingItem({ event, edit_href }: SpecialMeetingItemProps) {
  return (
    <LabelValueItem
      label={getTheocraticWeekLabel(event.start_date, {
        format: "event-date",
        end_date: event.end_date,
      })}
      value="Special Meeting"
      router_link={edit_href}
    />
  );
}
