import { IonContent, IonList } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { PublisherPublicSection } from "./components/publisher-public-section/PublisherPublicSection";
import { PublisherLocalSection } from "./components/publisher-local-section/PublisherLocalSection";
import { ArchivePublisherButton } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/publisher-details-content/components/archive-publisher-button/ArchivePublisherButton";
import { Space } from "@ui/components/layout/space/Space";

export function PublisherDetailsContent({
  publisher_id,
  read_only = false,
}: {
  publisher_id: string;
  read_only?: boolean;
}) {
  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisher_id)),
  );

  const publisher = data?.[0];

  if (isLoading) {
    return (
      <IonContent>
        <Spinner />
      </IonContent>
    );
  }

  if (!publisher) {
    return (
      <IonContent>
        <div className="ion-padding ion-text-center">
          <Body color="medium">Publisher not found.</Body>
        </div>
      </IonContent>
    );
  }

  return (
    <IonContent className="content-full">
      <IonList>
        <PublisherPublicSection
          publisher_id={publisher_id}
          publisher={publisher}
          read_only={read_only}
        />

        <PublisherLocalSection publisher_id={publisher_id} read_only={read_only} />

        <Space />

        <ArchivePublisherButton
          publisher_id={publisher_id}
          archived_at={publisher.archived_at}
          read_only={read_only}
        />
      </IonList>
    </IonContent>
  );
}
