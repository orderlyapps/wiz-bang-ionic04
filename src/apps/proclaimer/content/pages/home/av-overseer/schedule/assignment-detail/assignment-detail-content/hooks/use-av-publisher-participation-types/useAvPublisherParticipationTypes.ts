import { useLiveQuery } from "@tanstack/react-db";
import { avParticipationCollection } from "@shared/database/collections/av-participation";
import type { AvParticipationType } from "../../utils/avParticipationTypeMap";

export function useAvPublisherParticipationTypes(): Map<string, Set<AvParticipationType>> {
  const { data: allParticipations } = useLiveQuery((q) =>
    q.from({ ap: avParticipationCollection }),
  );

  const by_publisher = new Map<string, Set<AvParticipationType>>();

  for (const participation of allParticipations ?? []) {
    const participation_type = participation.participation_id as AvParticipationType;

    if (!by_publisher.has(participation.participant_id)) {
      by_publisher.set(participation.participant_id, new Set());
    }
    by_publisher.get(participation.participant_id)!.add(participation_type);
  }

  return by_publisher;
}
