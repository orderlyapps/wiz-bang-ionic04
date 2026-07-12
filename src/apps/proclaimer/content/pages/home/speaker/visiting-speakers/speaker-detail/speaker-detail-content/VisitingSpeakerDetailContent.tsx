import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { SpeakerInfoForm } from "@proclaimer-content/pages/home/speaker/visiting-speakers/speaker-detail/speaker-detail-content/components/speaker-info-form/SpeakerInfoForm";
import { SpeakerOutlinesList } from "@proclaimer-content/pages/home/speaker/visiting-speakers/speaker-detail/speaker-detail-content/components/speaker-outlines-list/SpeakerOutlinesList";
import type { Publisher } from "@shared/database/schemas/publisher";

interface VisitingSpeakerDetailContentProps {
  speaker_id: string;
}

export function VisitingSpeakerDetailContent({ speaker_id }: VisitingSpeakerDetailContentProps) {
  const { data: speaker_data } = useLiveQuery(
    (q) => q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, speaker_id)),
    [speaker_id],
  );

  const speaker = (speaker_data as Publisher[] | undefined)?.[0];

  if (!speaker) return null;

  return (
    <>
      <SpeakerInfoForm speaker={speaker} />
      <SpeakerOutlinesList speaker_id={speaker_id} />
    </>
  );
}
