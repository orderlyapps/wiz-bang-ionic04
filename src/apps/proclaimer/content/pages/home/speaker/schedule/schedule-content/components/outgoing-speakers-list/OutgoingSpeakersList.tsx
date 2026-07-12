import { useHistory } from "react-router-dom";
import { useLiveQuery } from "@tanstack/react-db";
import { and, eq } from "@tanstack/react-db";
import { speakerAssignmentCollection } from "@shared/database/collections/speaker-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { congregationCollection } from "@shared/database/collections/congregation";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import { Space } from "@ui/components/layout/space/Space";

type OutgoingSpeakersListProps = { week_id: string };
export function OutgoingSpeakersList({ week_id }: OutgoingSpeakersListProps) {
  const history = useHistory();
  const congregation_id = useStoredCongregation()?.id ?? "";
  const permissions = usePermissions();
  const can_edit =
    permissions.has_speaker || permissions.has_congregation_admin || permissions.is_super_admin;
  const { data: assignments } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .leftJoin({ p: publisherCollection }, ({ sa, p }) => eq(sa.speaker_id, p!.id))
        .leftJoin({ c: congregationCollection }, ({ sa, c }) => eq(sa.congregation_id, c!.id))
        .where(({ sa, p }) =>
          and(
            eq(sa.week_id, week_id),
            eq(p?.congregation_id, congregation_id),
            sa.congregation_id !== congregation_id,
          ),
        )
        .select(({ sa, p, c }) => ({
          week_id: sa.week_id,
          congregation_id: sa.congregation_id,
          first_name: p?.first_name,
          last_name: p?.last_name,
          display_name: p?.display_name,
          target_congregation_name: c?.name,
        })),
    [week_id, congregation_id],
  );
  const has_assignments = assignments && assignments.length > 0;
  if (!has_assignments && !can_edit) return null;

  return (
    <>
      <Space />
      <LabelValueItem
        label="Outgoing Speakers"
        end_detail={
          can_edit && (
            <AddIconButton
              slot="end"
              on_click={() =>
                history.push(`/home/speaker/schedule/${week_id}/add-outgoing-speaker`)
              }
            />
          )
        }
      />
      {has_assignments &&
        assignments.map((assignment) => (
          <LabelValueItem
            key={makeCompositeKey(assignment.week_id, assignment.congregation_id)}
            label={
              assignment.first_name && assignment.last_name
                ? getPublisherDisplayName({
                    first_name: assignment.first_name,
                    last_name: assignment.last_name,
                    display_name: assignment.display_name,
                  })
                : "Unknown Speaker"
            }
            value={assignment.target_congregation_name}
            end_detail={
              can_edit && (
                <DeleteIconButton
                  slot="end"
                  on_click={() =>
                    speakerAssignmentCollection.delete(
                      makeCompositeKey(assignment.week_id, assignment.congregation_id),
                    )
                  }
                />
              )
            }
          />
        ))}
    </>
  );
}
