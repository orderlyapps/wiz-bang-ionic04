import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { midweekParticipationCollection } from "@shared/database/collections/midweek-participation";
import type { MidweekParticipation } from "@shared/database/schemas/midweek-participation";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { makeCompositeKey } from "@shared/database/util/composite-key";

export interface ParticipantPublisher {
  participant_id: string;
  publisher: Publisher;
  display_name: string;
}

export function useParticipantPublishers(
  participation_id: MidweekParticipation["participation_id"],
) {
  const { data: allParticipations, isLoading: isLoadingParticipations } = useLiveQuery((q) =>
    q.from({ mp: midweekParticipationCollection }),
  );

  const { data: publishers, isLoading: isLoadingPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }),
  );

  const isLoading = isLoadingParticipations || isLoadingPublishers;

  const participations = (allParticipations ?? []).filter(
    (p) => p.participation_id === participation_id && p.is_participant,
  );

  const participantPublishers: ParticipantPublisher[] = participations
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
    .sort((a, b) => {
      // Sort by last_name first
      const lastNameCompare = a.publisher.last_name.localeCompare(b.publisher.last_name);
      if (lastNameCompare !== 0) return lastNameCompare;

      // If last_names are equal, sort by display_name if they have one
      if (a.publisher.display_name && b.publisher.display_name) {
        const displayNameCompare = a.publisher.display_name.localeCompare(b.publisher.display_name);
        if (displayNameCompare !== 0) return displayNameCompare;
      } else if (a.publisher.display_name) {
        return -1; // a has display_name, b doesn't, so a comes first
      } else if (b.publisher.display_name) {
        return 1; // b has display_name, a doesn't, so b comes first
      }

      // Finally, sort by first_name
      return a.publisher.first_name.localeCompare(b.publisher.first_name);
    });

  const participantIds = new Set(participations.map((p) => p.participant_id));

  const nonParticipantPublishers: ParticipantPublisher[] = (publishers ?? [])
    .filter((p) => !participantIds.has(p.id ?? ""))
    .map((p) => ({
      participant_id: p.id ?? "",
      publisher: p,
      display_name: getPublisherDisplayName(p),
    }))
    .sort((a, b) => {
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
    });

  function removeParticipant(participant_id: string) {
    midweekParticipationCollection.update(
      makeCompositeKey(participant_id, participation_id),
      (draft) => {
        draft.is_participant = false;
      },
    );
  }

  function addParticipant(participant_id: string) {
    const existingRow = (allParticipations ?? []).find(
      (p) => p.participant_id === participant_id && p.participation_id === participation_id,
    );
    if (existingRow) {
      midweekParticipationCollection.update(
        makeCompositeKey(participant_id, participation_id),
        (draft) => {
          draft.is_participant = true;
        },
      );
    } else {
      midweekParticipationCollection.insert({
        participant_id,
        participation_id,
        is_participant: true,
      });
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
