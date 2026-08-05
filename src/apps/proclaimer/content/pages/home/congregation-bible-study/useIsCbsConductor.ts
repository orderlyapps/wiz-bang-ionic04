import { and, eq, useLiveQuery } from "@tanstack/react-db";
import { midweekParticipationCollection } from "@shared/database/collections/midweek-participation";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";

export function useIsCbsConductor() {
  const publisher = useStoredPublisher();
  const publisher_id = publisher?.id ?? "";

  const { data } = useLiveQuery(
    (q) =>
      publisher_id
        ? q
            .from({ mp: midweekParticipationCollection })
            .where(({ mp }) =>
              and(eq(mp.participant_id, publisher_id), eq(mp.participation_id, "cbs_conductor")),
            )
        : undefined,
    [publisher_id],
  );

  const is_cbs_conductor = (data ?? []).some((mp) => mp.is_participant);

  return { is_cbs_conductor };
}
