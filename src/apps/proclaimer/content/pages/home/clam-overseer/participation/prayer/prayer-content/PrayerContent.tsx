import { Heading } from "@ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "@proclaimer-content/pages/home/clam-overseer/participation/shared/components/participant-publishers-list/ParticipantPublishersList";

export function PrayerContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        Prayer
      </Heading>
      <ParticipantPublishersList participation_id="prayer" />
    </div>
  );
}
