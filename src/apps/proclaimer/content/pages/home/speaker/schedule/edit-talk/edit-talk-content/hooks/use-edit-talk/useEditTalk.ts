import { useLiveQuery } from "@tanstack/react-db";
import { and, eq } from "@tanstack/react-db";
import { speakerAssignmentCollection } from "@shared/database/collections/speaker-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { outlineCollection } from "@shared/database/collections/outline";
import { speakerOutlineCollection } from "@shared/database/collections/speaker-outline";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import type { SpeakerAssignment } from "@shared/database/schemas/speaker-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { Outline } from "@shared/database/schemas/outline";
import type { SpeakerOutline } from "@shared/database/schemas/speaker-outline";

interface UseEditTalkProps {
  week_id: string;
}

export function useEditTalk({ week_id }: UseEditTalkProps) {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id ?? "";

  const { data: assignment } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .where(({ sa }) => and(eq(sa.week_id, week_id), eq(sa.congregation_id, congregation_id))),
    [week_id, congregation_id],
  );

  const { data: all_publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const { data: all_outlines } = useLiveQuery((q) =>
    q.from({ o: outlineCollection }).orderBy(({ o }) => o.id),
  );

  const { data: all_speaker_outlines } = useLiveQuery((q) =>
    q.from({ so: speakerOutlineCollection }),
  );

  const current_assignment = (assignment as SpeakerAssignment[] | undefined)?.[0];

  const current_speaker = all_publishers?.find((p) => p.id === current_assignment?.speaker_id) as
    | Publisher
    | undefined;

  const current_outline = all_outlines?.find((o) => o.id === current_assignment?.outline_id) as
    | Outline
    | undefined;

  const current_speaker_label = current_speaker
    ? getPublisherDisplayName(current_speaker)
    : undefined;

  const current_outline_label = current_outline
    ? `${current_outline.id}: ${current_outline.theme}`
    : undefined;

  const speaker_outline_ids = new Set(
    ((all_speaker_outlines as SpeakerOutline[] | undefined) ?? []).map((so) => so.speaker_id),
  );

  const male_publishers = ((all_publishers as Publisher[] | undefined) ?? []).filter(
    (p) => !p.archived_at && p.gender === "male",
  );

  const local_speakers = male_publishers.filter(
    (p) =>
      p.congregation_id === congregation_id &&
      (p.type === "speaker" || speaker_outline_ids.has(p.id ?? "")),
  );
  const visiting_speakers = male_publishers.filter(
    (p) => p.congregation_id !== congregation_id && p.type === "speaker",
  );

  const selected_speaker_id = current_assignment?.speaker_id;
  const selected_speaker_outline_ids = new Set(
    ((all_speaker_outlines as SpeakerOutline[] | undefined) ?? [])
      .filter((so) => so.speaker_id === selected_speaker_id)
      .map((so) => so.outline_id)
      .filter((id): id is string => !!id),
  );

  const outlines = selected_speaker_id
    ? ((all_outlines as Outline[] | undefined) ?? []).filter((o) =>
        selected_speaker_outline_ids.has(o.id),
      )
    : [];

  function handleSelectSpeaker(speaker_id: string) {
    if (!congregation_id) return;
    const key = makeCompositeKey(week_id, congregation_id);
    if (current_assignment) {
      speakerAssignmentCollection.update(key, (draft) => {
        draft.speaker_id = speaker_id;
        draft.outline_id = null;
      });
    } else {
      speakerAssignmentCollection.insert({
        week_id,
        congregation_id,
        speaker_id,
        outline_id: null,
      });
    }
  }

  function handleSelectOutline(outline_id: string | null) {
    if (!congregation_id || !current_assignment) return;
    const key = makeCompositeKey(week_id, congregation_id);
    speakerAssignmentCollection.update(key, (draft) => {
      draft.outline_id = outline_id;
    });
  }

  function handleClearAssignment() {
    if (!congregation_id || !current_assignment) return;
    const key = makeCompositeKey(week_id, congregation_id);
    speakerAssignmentCollection.delete(key);
  }

  return {
    current_assignment,
    current_speaker_id: current_assignment?.speaker_id,
    current_speaker_label,
    current_outline,
    current_outline_label,
    local_speakers,
    visiting_speakers,
    outlines,
    handleSelectSpeaker,
    handleSelectOutline,
    handleClearAssignment,
  };
}
