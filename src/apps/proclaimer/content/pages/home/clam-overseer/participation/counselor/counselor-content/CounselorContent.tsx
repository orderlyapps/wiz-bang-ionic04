import { Heading } from "@ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "@proclaimer-content/pages/home/clam-overseer/participation/shared/components/participant-publishers-list/ParticipantPublishersList";

export function CounselorContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        Counselor
      </Heading>
      <ParticipantPublishersList participation_id="counselor" />
    </div>
  );
}
