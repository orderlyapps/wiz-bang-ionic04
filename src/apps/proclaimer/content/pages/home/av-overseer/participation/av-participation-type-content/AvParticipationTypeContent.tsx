import { Heading } from "@ui/components/display/text/heading/Heading";
import { AvParticipantPublishersList } from "@proclaimer-content/pages/home/av-overseer/participation/shared/components/av-participant-publishers-list/AvParticipantPublishersList";

interface AvParticipationTypeContentProps {
  participation_id: string;
  label: string;
}

export function AvParticipationTypeContent({
  participation_id,
  label,
}: AvParticipationTypeContentProps) {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        {label}
      </Heading>
      <AvParticipantPublishersList participation_id={participation_id} />
    </div>
  );
}
