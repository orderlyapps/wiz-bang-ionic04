import { useLiveQuery } from "@tanstack/react-db";
import { speakerAssignmentCollection } from "@shared/database/collections/speaker-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { congregationCollection } from "@shared/database/collections/congregation";
import { outlineCollection } from "@shared/database/collections/outline";
import { and, eq } from "@tanstack/react-db";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { IonItem, IonLabel } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";

type OutgoingSpeakersDisplayProps = {
  weekId: string;
};

export const OutgoingSpeakersDisplay: React.FC<OutgoingSpeakersDisplayProps> = ({ weekId }) => {
  const congregation = useStoredCongregation();
  const congregationId = congregation?.id;

  const { data: outgoingAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .leftJoin({ p: publisherCollection }, ({ sa, p }) => eq(sa.speaker_id, p!.id))
        .leftJoin({ c: congregationCollection }, ({ sa, c }) => eq(sa.congregation_id, c!.id))
        .leftJoin({ o: outlineCollection }, ({ sa, o }) => eq(sa.outline_id, o!.id))
        .where(({ sa, p }) =>
          and(
            eq(sa.week_id, weekId),
            eq(p?.congregation_id, congregationId ?? ""),
            sa.congregation_id !== (congregationId as string),
          ),
        )
        .select(({ sa, p, c, o }) => ({
          speakerId: sa.speaker_id,
          outlineId: sa.outline_id,
          first_name: p?.first_name,
          last_name: p?.last_name,
          display_name: p?.display_name,
          targetCongregationId: sa.congregation_id,
          targetCongregationName: c?.name,
          outlineTheme: o?.theme,
        })),
    [weekId, congregationId],
  );

  return (
    <>
      <IonItem>
        <IonLabel>
          <Heading>Outgoing Speakers</Heading>
        </IonLabel>
      </IonItem>
      {outgoingAssignments && outgoingAssignments.length > 0 ? (
        outgoingAssignments.map((assignment, index) => {
          const speakerName =
            assignment?.first_name && assignment?.last_name
              ? getPublisherDisplayName({
                  first_name: assignment.first_name,
                  last_name: assignment.last_name,
                  display_name: assignment.display_name,
                })
              : "Unknown Speaker";

          return (
            <div key={index}>
              <LabelValueItem
                label={speakerName}
                value={assignment.targetCongregationName}
                value_2={
                  assignment.outlineTheme
                    ? `${assignment.outlineId}: ${assignment.outlineTheme}`
                    : undefined
                }
              />
            </div>
          );
        })
      ) : (
        <LabelValueItem
          label="Outgoing Speakers"
          value="No outgoing speakers this week"
          value_color="medium"
        />
      )}
    </>
  );
};
