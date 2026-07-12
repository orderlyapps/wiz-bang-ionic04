import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { avParticipationCollection } from "@shared/database/collections/av-participation";
import type { AvParticipation } from "@shared/database/schemas/av-participation";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { makeCompositeKey } from "@shared/database/util/composite-key";

export interface AvParticipantPublisher {
  participant_id: string;
  publisher: Publisher;
  display_name: string;
}

function sortByName(a: AvParticipantPublisher, b: AvParticipantPublisher): number {
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

export function useAvParticipantPublishers(participation_id: AvParticipation["participation_id"]) {
  const { data: allParticipations, isLoading: isLoadingParticipations } = useLiveQuery((q) =>
    q.from({ ap: avParticipationCollection }),
  );

  const { data: publishers, isLoading: isLoadingPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }),
  );

  const isLoading = isLoadingParticipations || isLoadingPublishers;

  const participations = (allParticipations ?? []).filter(
    (p) => p.participation_id === participation_id,
  );

  const participantPublishers: AvParticipantPublisher[] = participations
    .map((participation) => {
      const publisher = (publishers ?? []).find((p) => p.id === participation.participant_id);
      if (!publisher) return null;
      return {
        participant_id: participation.participant_id,
        publisher,
        display_name: getPublisherDisplayName(publisher),
      };
    })
    .filter((pp) => pp !== null)
    .sort(sortByName);

  const participantIds = new Set(participations.map((p) => p.participant_id));

  const nonParticipantPublishers: AvParticipantPublisher[] = (publishers ?? [])
    .filter((p) => !participantIds.has(p.id ?? ""))
    .map((p) => ({
      participant_id: p.id ?? "",
      publisher: p,
      display_name: getPublisherDisplayName(p),
    }))
    .sort(sortByName);

  function removeParticipant(participant_id: string) {
    avParticipationCollection.delete(makeCompositeKey(participant_id, participation_id));
  }

  function addParticipant(participant_id: string) {
    const existingRow = (allParticipations ?? []).find(
      (p) => p.participant_id === participant_id && p.participation_id === participation_id,
    );
    if (!existingRow) {
      avParticipationCollection.insert({ participant_id, participation_id });
    }
  }

  return {
    participantPublishers,
    nonParticipantPublishers,
    isLoading,
    removeParticipant,
    addParticipant,
  };
}
