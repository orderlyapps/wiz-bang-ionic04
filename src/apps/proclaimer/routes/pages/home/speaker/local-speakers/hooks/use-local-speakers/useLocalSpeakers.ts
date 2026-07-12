import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { speakerOutlineCollection } from "@shared/database/collections/speaker-outline";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { SpeakerOutline } from "@shared/database/schemas/speaker-outline";

export function useLocalSpeakers() {
  const congregation_id = useStoredCongregation()?.id ?? "";

  const { data: all_publishers, isLoading } = useLiveQuery(
    (q) => q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
    [],
  );

  const { data: all_speaker_outlines } = useLiveQuery(
    (q) => q.from({ so: speakerOutlineCollection }),
    [],
  );

  const speaker_outline_ids = new Set(
    ((all_speaker_outlines as SpeakerOutline[] | undefined) ?? [])
      .map((so) => so.speaker_id)
      .filter((id): id is string => !!id),
  );

  const local_speakers = ((all_publishers as Publisher[] | undefined) ?? []).filter(
    (p) =>
      !p.archived_at &&
      p.gender === "male" &&
      p.congregation_id === congregation_id &&
      (p.type === "speaker" || speaker_outline_ids.has(p.id ?? "")),
  );

  return { local_speakers, is_loading: isLoading };
}
