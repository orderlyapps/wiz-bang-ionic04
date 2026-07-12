import { useVisitingSpeakers } from "@proclaimer-routes/pages/home/speaker/visiting-speakers/hooks/use-visiting-speakers/useVisitingSpeakers";
import { SpeakerList } from "@proclaimer-routes/pages/home/speaker/shared/components/speaker-list/SpeakerList";
import type { SpeakerListItem } from "@proclaimer-routes/pages/home/speaker/shared/components/speaker-list/SpeakerList";

export function VisitingSpeakersList() {
  const { visiting_speakers, is_loading } = useVisitingSpeakers();

  const items = visiting_speakers.map((speaker) => ({
    ...speaker,
    subtitle: speaker.congregation_name,
  }));

  function getHref(speaker: SpeakerListItem) {
    return `/home/speaker/visiting-speakers/${speaker.id}`;
  }

  return (
    <SpeakerList
      speakers={items}
      empty_label="No visiting speakers"
      is_loading={is_loading}
      get_href={getHref}
    />
  );
}
