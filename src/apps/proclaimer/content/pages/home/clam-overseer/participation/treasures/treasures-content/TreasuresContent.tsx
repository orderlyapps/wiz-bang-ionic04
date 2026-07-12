import { Heading } from "@ui/components/display/text/heading/Heading";
import { ParticipantPublishersList } from "@proclaimer-content/pages/home/clam-overseer/participation/shared/components/participant-publishers-list/ParticipantPublishersList";

export function TreasuresContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        Treasures
      </Heading>
      <ParticipantPublishersList participation_id="treasures" />
    </div>
  );
}
