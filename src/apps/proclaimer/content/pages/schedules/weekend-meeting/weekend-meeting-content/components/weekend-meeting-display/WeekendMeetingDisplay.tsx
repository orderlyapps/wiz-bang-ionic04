import { useLiveQuery } from "@tanstack/react-db";
import { speakerAssignmentCollection } from "@shared/database/collections/speaker-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { outlineCollection } from "@shared/database/collections/outline";
import { congregationCollection } from "@shared/database/collections/congregation";
import { and, eq } from "@tanstack/react-db";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";

type WeekendMeetingDisplayProps = {
  weekId: string;
};

export const WeekendMeetingDisplay: React.FC<WeekendMeetingDisplayProps> = ({ weekId }) => {
  const congregation = useStoredCongregation();
  const congregationId = congregation?.id;

  const { data: currentAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .leftJoin({ p: publisherCollection }, ({ sa, p }) => eq(sa.speaker_id, p!.id))
        .leftJoin({ o: outlineCollection }, ({ sa, o }) => eq(sa.outline_id, o!.id))
        .leftJoin({ c: congregationCollection }, ({ p, c }) => eq(p?.congregation_id, c!.id))
        .where(({ sa }) =>
          and(eq(sa.week_id, weekId), eq(sa.congregation_id, congregationId ?? "")),
        )
        .select(({ sa, p, o, c }) => ({
          speakerId: sa.speaker_id,
          outlineId: sa.outline_id,
          first_name: p?.first_name,
          last_name: p?.last_name,
          display_name: p?.display_name,
          speakerCongregationId: p?.congregation_id,
          congregationName: c?.name,
          outlineTheme: o?.theme,
        })),
    [weekId, congregationId],
  );

  const currentAssignment = currentAssignments?.[0];

  const speakerName =
    currentAssignment?.first_name && currentAssignment?.last_name
      ? getPublisherDisplayName({
          first_name: currentAssignment.first_name,
          last_name: currentAssignment.last_name,
          display_name: currentAssignment.display_name,
        })
      : "Unknown Speaker";

  const isLocalSpeaker = currentAssignment?.speakerCongregationId === congregationId;

  return (
    <>
      {currentAssignment ? (
        <>
          <LabelValueItem label="Speaker" value={speakerName} />
          {currentAssignment.congregationName && !isLocalSpeaker && (
            <LabelValueItem label="Congregation" value={currentAssignment.congregationName} />
          )}
          {currentAssignment.outlineTheme && (
            <LabelValueItem label="Theme" value={currentAssignment.outlineTheme} />
          )}
        </>
      ) : (
        <LabelValueItem
          label="Weekend Meeting Speaker"
          value="No speaker assigned for this week"
          value_color="medium"
        />
      )}
    </>
  );
};
