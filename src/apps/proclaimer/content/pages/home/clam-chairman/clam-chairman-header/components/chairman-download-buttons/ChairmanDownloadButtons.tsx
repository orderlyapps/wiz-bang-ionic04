import { useLiveQuery } from "@tanstack/react-db";
import { addWeeks, format, startOfWeek } from "date-fns";
import { midweekMeetingDataCollection } from "@shared/database/collections/midweek-meeting-data";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { MidweekMeetingData } from "@shared/database/schemas/midweek-meeting-data";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { chairmansOutlineDocX } from "../../../docx/chairmansOutlineDocX";
import { DocXDownloadButton } from "../docx-download-button/DocXDownloadButton";

interface ChairmanDownloadButtonsProps {
  week_ids: string[];
}

export function ChairmanDownloadButtons({ week_ids }: ChairmanDownloadButtonsProps) {
  const { data: allMeetingData } = useLiveQuery((q) =>
    q.from({ mmd: midweekMeetingDataCollection }),
  );
  const { data: allAssignments } = useLiveQuery((q) => q.from({ ma: midweekAssignmentCollection }));
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  if (allMeetingData === undefined || allAssignments === undefined || publishers === undefined) {
    return <Spinner size="sm" centered={false} />;
  }

  return (
    <>
      {week_ids.map((week_id) => {
        const meetingData = (allMeetingData as MidweekMeetingData[] | undefined)?.find(
          (m) => m.week_id === week_id,
        );
        const assignments = (allAssignments as MidweekAssignment[] | undefined)?.filter(
          (a) => a.week_id === week_id,
        );
        const next_week_id = format(
          startOfWeek(addWeeks(new Date(week_id), 1), { weekStartsOn: 1 }),
          "yyyy-MM-dd",
        );
        const nextMeetingData = (allMeetingData as MidweekMeetingData[] | undefined)?.find(
          (m) => m.week_id === next_week_id,
        );
        const nextAssignments = (allAssignments as MidweekAssignment[] | undefined)?.filter(
          (a) => a.week_id === next_week_id,
        );

        const doc = chairmansOutlineDocX(
          week_id,
          meetingData,
          assignments,
          publishers as Publisher[] | undefined,
          nextMeetingData,
          nextAssignments,
        );

        const week_label = getTheocraticWeekLabel(week_id, {
          format: "week-range",
          useRelativeWeek: true,
        });

        return (
          <DocXDownloadButton
            key={week_id}
            doc={doc}
            fileName={`Chairman's Outline - ${week_label}.docx`}
            label={week_ids.length > 1 ? week_label : "Outline"}
          />
        );
      })}
    </>
  );
}
