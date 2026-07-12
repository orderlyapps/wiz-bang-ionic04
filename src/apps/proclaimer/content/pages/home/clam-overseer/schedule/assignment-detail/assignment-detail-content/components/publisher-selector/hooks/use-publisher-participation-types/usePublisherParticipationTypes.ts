import { useLiveQuery } from "@tanstack/react-db";
import { midweekParticipationCollection } from "@shared/database/collections/midweek-participation";
import type { ParticipationType } from "../../utils/participationTypeMap";

export function usePublisherParticipationTypes(
  _congregation_id: string | undefined,
): Map<string, Set<ParticipationType>> {
  const { data: allParticipations } = useLiveQuery((q) =>
    q.from({ mp: midweekParticipationCollection }),
  );

  const by_publisher = new Map<string, Set<ParticipationType>>();

  for (const participation of allParticipations ?? []) {
    if (!participation.is_participant) continue;

    const participation_type = participation.participation_id as ParticipationType;

    if (!by_publisher.has(participation.participant_id)) {
      by_publisher.set(participation.participant_id, new Set());
    }
    by_publisher.get(participation.participant_id)!.add(participation_type);
  }

  return by_publisher;
}
