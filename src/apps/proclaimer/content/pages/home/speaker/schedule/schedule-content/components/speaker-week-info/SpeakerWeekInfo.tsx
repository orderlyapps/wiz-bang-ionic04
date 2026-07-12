import { useLiveQuery } from "@tanstack/react-db";
import { and, eq } from "@tanstack/react-db";
import { speakerAssignmentCollection } from "@shared/database/collections/speaker-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { outlineCollection } from "@shared/database/collections/outline";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";

type SpeakerWeekInfoProps = {
  week_id: string;
};

export function SpeakerWeekInfo({ week_id }: SpeakerWeekInfoProps) {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id ?? "";
  const permissions = usePermissions();
  const can_edit = permissions.has_speaker || permissions.has_congregation_admin;

  const { data: assignments } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .leftJoin({ p: publisherCollection }, ({ sa, p }) => eq(sa.speaker_id, p!.id))
        .leftJoin({ o: outlineCollection }, ({ sa, o }) => eq(sa.outline_id, o!.id))
        .where(({ sa }) => and(eq(sa.week_id, week_id), eq(sa.congregation_id, congregation_id)))
        .select(({ sa, p, o }) => ({
          speaker_id: sa.speaker_id,
          outline_id: sa.outline_id,
          first_name: p?.first_name,
          last_name: p?.last_name,
          display_name: p?.display_name,
          theme: o?.theme,
        })),
    [week_id, congregation_id],
  );

  const assignment = assignments?.[0];
  const speaker_name =
    assignment?.first_name && assignment?.last_name
      ? getPublisherDisplayName({
          first_name: assignment.first_name,
          last_name: assignment.last_name,
          display_name: assignment.display_name,
        })
      : undefined;

  return (
    <>
      {speaker_name && <LabelValueItem label="Speaker" value={speaker_name} />}
      {assignment?.outline_id && (
        <LabelValueItem label="Outline ID" value={assignment.outline_id} />
      )}
      {assignment?.theme && <LabelValueItem label="Theme" value={assignment.theme} />}
      {!assignment && (
        <LabelValueItem
          label="Speaker"
          value="No speaker assigned for this week"
          value_color="medium"
        />
      )}
      {can_edit && (
        <>
          <Space />
          <TextButton
            label="Edit Public Talk"
            routerLink={`/home/speaker/schedule/${week_id}/edit`}
          />
        </>
      )}
    </>
  );
}
