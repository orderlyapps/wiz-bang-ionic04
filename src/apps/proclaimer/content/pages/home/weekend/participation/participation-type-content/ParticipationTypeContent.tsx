import { Heading } from "@ui/components/display/text/heading/Heading";
import { WeekendParticipantPublishersList } from "@proclaimer-content/pages/home/weekend/participation/shared/components/weekend-participant-publishers-list/WeekendParticipantPublishersList";

interface ParticipationTypeContentProps {
  participation_id: string;
  label: string;
}

export function ParticipationTypeContent({
  participation_id,
  label,
}: ParticipationTypeContentProps) {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        {label}
      </Heading>
      <WeekendParticipantPublishersList participation_id={participation_id} />
    </div>
  );
}
