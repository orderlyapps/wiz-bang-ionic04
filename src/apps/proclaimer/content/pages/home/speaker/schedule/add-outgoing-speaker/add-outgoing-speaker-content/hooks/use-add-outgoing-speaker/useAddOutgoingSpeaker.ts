import { useLiveQuery, eq } from "@tanstack/react-db";
import { useLocalSpeakers } from "@proclaimer-routes/pages/home/speaker/local-speakers/hooks/use-local-speakers/useLocalSpeakers";
import { congregationCollection } from "@shared/database/collections/congregation";
import { outlineCollection } from "@shared/database/collections/outline";
import { speakerAssignmentCollection } from "@shared/database/collections/speaker-assignment";
import { speakerOutlineCollection } from "@shared/database/collections/speaker-outline";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import type { Congregation } from "@shared/database/schemas/congregation";
import type { Outline } from "@shared/database/schemas/outline";
import type { SpeakerAssignment } from "@shared/database/schemas/speaker-assignment";
import type { SpeakerOutline } from "@shared/database/schemas/speaker-outline";

export const ADD_NEW_CONGREGATION_VALUE = "add_new";

interface UseAddOutgoingSpeakerProps {
  week_id: string;
  selected_congregation_id: string | null;
  selected_speaker_id: string | null;
  selected_outline_id: string | null;
}

export function useAddOutgoingSpeaker({
  week_id,
  selected_congregation_id,
  selected_speaker_id,
  selected_outline_id,
}: UseAddOutgoingSpeakerProps) {
  const current_congregation_id = useStoredCongregation()?.id ?? "";

  const { data: all_congregations } = useLiveQuery((q) =>
    q.from({ c: congregationCollection }).orderBy(({ c }) => c.name),
  );

  const { local_speakers, is_loading: is_speakers_loading } = useLocalSpeakers();

  const { data: all_outlines } = useLiveQuery((q) =>
    q.from({ o: outlineCollection }).orderBy(({ o }) => o.id),
  );

  const { data: all_speaker_outlines } = useLiveQuery((q) =>
    q.from({ so: speakerOutlineCollection }),
  );

  const { data: existing_assignments } = useLiveQuery(
    (q) => q.from({ sa: speakerAssignmentCollection }).where(({ sa }) => eq(sa.week_id, week_id)),
    [week_id],
  );

  const congregations = ((all_congregations as Congregation[] | undefined) ?? []).filter(
    (c) => c.id !== current_congregation_id,
  );

  const congregation_options = [
    ...congregations.map((c) => ({ value: c.id ?? "", label: c.name })),
    { value: ADD_NEW_CONGREGATION_VALUE, label: "Add New..." },
  ];

  const speaker_options = local_speakers.map((s) => ({
    value: s.id ?? "",
    label: getPublisherDisplayName(s),
  }));

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

  const can_save = !!selected_congregation_id && !!selected_speaker_id && !!selected_outline_id;

  async function add_congregation(name: string) {
    const trimmed_name = name.trim();
    if (!trimmed_name || !current_congregation_id) return;
    const new_congregation_id = crypto.randomUUID();
    const tx = congregationCollection.insert({
      id: new_congregation_id,
      name: trimmed_name,
      congregation_id: current_congregation_id,
    });
    await tx.isPersisted.promise;
    return new_congregation_id;
  }

  async function save() {
    if (!can_save) return;
    const target_congregation_id = selected_congregation_id!;
    const speaker_id = selected_speaker_id!;
    const existing = ((existing_assignments as SpeakerAssignment[] | undefined) ?? []).find(
      (a) => a.congregation_id === target_congregation_id,
    );

    if (existing) {
      const key = makeCompositeKey(week_id, target_congregation_id);
      const tx = speakerAssignmentCollection.update(key, (draft) => {
        draft.speaker_id = speaker_id;
        draft.outline_id = selected_outline_id ?? null;
      });
      await tx.isPersisted.promise;
    } else {
      const tx = speakerAssignmentCollection.insert({
        week_id,
        congregation_id: target_congregation_id,
        speaker_id,
        outline_id: selected_outline_id ?? null,
      });
      await tx.isPersisted.promise;
    }
  }

  return {
    congregation_options,
    speaker_options,
    outlines,
    can_save,
    is_speakers_loading,
    add_congregation,
    save,
  };
}
