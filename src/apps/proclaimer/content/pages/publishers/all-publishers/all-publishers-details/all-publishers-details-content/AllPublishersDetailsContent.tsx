import { PublisherDetailsContent } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/publisher-details-content/PublisherDetailsContent";

export function AllPublishersDetailsContent({
  publisher_id,
  read_only,
}: {
  publisher_id: string;
  read_only: boolean;
}) {
  return <PublisherDetailsContent publisher_id={publisher_id} read_only={read_only} />;
}
