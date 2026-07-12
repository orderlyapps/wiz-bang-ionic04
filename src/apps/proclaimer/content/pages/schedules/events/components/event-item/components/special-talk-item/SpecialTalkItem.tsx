import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@shared/database/schemas/event";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";

interface SpecialTalkItemProps {
  event: EventRow;
  edit_href?: string;
}

export function SpecialTalkItem({ event, edit_href }: SpecialTalkItemProps) {
  return (
    <LabelValueItem
      label={getTheocraticWeekLabel(event.start_date, {
        format: "event-date",
        end_date: event.end_date,
      })}
      value="Special Talk"
      value_2={event.name || undefined}
      router_link={edit_href}
    />
  );
}
