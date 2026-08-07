import { addDays } from "date-fns/addDays";
import { parseISO } from "date-fns/parseISO";
import { format } from "date-fns/format";
import { useLiveQuery } from "@tanstack/react-db";
import { Select } from "@ui/components/inputs/select/Select";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { TimeInput } from "@ui/components/inputs/time/TimeInput";
import { WeekSelect } from "@proclaimer-shared/components/inputs/week-select/WeekSelect";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { formatPublisherName } from "@util/format/formatPublisherName";
import type { EventFormFieldProps } from "../../types";

export function CircuitVisitForm(props: EventFormFieldProps) {
  const { on_change, on_details_change, details } = props;
  const congregation_id = getStoredCongregation()?.id;

  const { data: allPublishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const circuit_overseers = ((allPublishers as Publisher[] | undefined) ?? [])
    .filter(
      (p) =>
        p.type === "circuit_overseer" &&
        p.id &&
        (!congregation_id || p.congregation_id === congregation_id),
    )
    .map((p) => ({ label: formatPublisherName(p), value: p.id as string }));

  function handleWeekChange(week_start: string) {
    on_change("start_date", week_start);
    on_change("end_date", week_start ? format(addDays(parseISO(week_start), 6), "yyyy-MM-dd") : "");
  }

  return (
    <>
      <Select
        label="Name"
        value={props.name}
        options={circuit_overseers}
        placeholder="Select Circuit Overseer"
        on_change={(v) => on_change("name", (v as string) ?? "")}
      />
      <WeekSelect value={props.start_date} on_change={handleWeekChange} />
      <TextInput
        label="Midweek Theme"
        value={details.midweek_theme}
        on_change={(v) => on_details_change("midweek_theme", v)}
      />
      <TextInput
        label="Weekend Theme"
        value={details.weekend_theme}
        on_change={(v) => on_details_change("weekend_theme", v)}
      />
      <TimeInput
        label="Pioneer Meeting Time"
        value={details.pioneer_meeting_time}
        on_change={(v) => on_details_change("pioneer_meeting_time", v)}
      />
    </>
  );
}
