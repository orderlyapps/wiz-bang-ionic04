import { PublisherDetailsContent } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/publisher-details-content/PublisherDetailsContent";

export function AllPublishersDetailsContent({
  publisher_id,
  read_only,
  reports_path,
  assignments_path,
  participation_path,
}: {
  publisher_id: string;
  read_only: boolean;
  reports_path?: string;
  assignments_path?: string;
  participation_path?: string;
}) {
  return (
    <PublisherDetailsContent
      publisher_id={publisher_id}
      read_only={read_only}
      reports_path={reports_path}
      assignments_path={assignments_path}
      participation_path={participation_path}
    />
  );
}
