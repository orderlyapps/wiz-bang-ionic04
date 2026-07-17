import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { avParticipationCollection } from "@shared/database/collections/av-participation";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { AvParticipation } from "@shared/database/schemas/av-participation";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";

export interface AvParticipant {
  participant_id: string;
  publisher: Publisher;
  display_name: string;
  participations: AvParticipation[];
}

function sortByName(a: AvParticipant, b: AvParticipant): number {
  const lastNameCompare = a.publisher.last_name.localeCompare(b.publisher.last_name);
  if (lastNameCompare !== 0) return lastNameCompare;

  if (a.publisher.display_name && b.publisher.display_name) {
    const displayNameCompare = a.publisher.display_name.localeCompare(b.publisher.display_name);
    if (displayNameCompare !== 0) return displayNameCompare;
  } else if (a.publisher.display_name) {
    return -1;
  } else if (b.publisher.display_name) {
    return 1;
  }

  return a.publisher.first_name.localeCompare(b.publisher.first_name);
}

export function useAvParticipants() {
  const { data: allParticipations, isLoading: isLoadingParticipations } = useLiveQuery((q) =>
    q.from({ ap: avParticipationCollection }),
  );

  const { data: publishers, isLoading: isLoadingPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }),
  );

  const isLoading = isLoadingParticipations || isLoadingPublishers;

  const participantIds = new Set((allParticipations ?? []).map((p) => p.participant_id));

  const participants: AvParticipant[] = (publishers ?? [])
    .filter((p) => p.id && participantIds.has(p.id))
    .map((p) => ({
      participant_id: p.id ?? "",
      publisher: p,
      display_name: getPublisherDisplayName(p),
      participations: (allParticipations ?? []).filter(
        (ap) => ap.participant_id === p.id,
      ),
    }))
    .sort(sortByName);

  return { participants, isLoading };
}
