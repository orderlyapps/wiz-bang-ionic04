import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { IonList, IonItem } from "@ionic/react";

export function PublishersContent() {
  const congregation_id = getStoredCongregation()?.id;

  const { data, isLoading } = useLiveQuery(
    (q) =>
      q
        .from({ p: publisherCollection })
        .where(({ p }) => eq(p.congregation_id, congregation_id ?? ""))
        .orderBy(({ p }) => p.last_name),
    [congregation_id],
  );

  if (isLoading) {
    return <Spinner />;
  }

  const publishers = (data ?? []).filter((p) => p.archived_at === null);

  if (publishers.length === 0) {
    return (
      <div className="ion-padding ion-text-center">
        <Body color="medium">No publishers found.</Body>
      </div>
    );
  }

  return (
    <IonList>
      <MultiColumnList
        items={publishers}
        get_id={(p) => p.id ?? ""}
        gap="sm"
        render_item={(p) => (
          <IonItem routerLink={`/home/elder/reports/publishers/${p.id}`}>
            {getPublisherDisplayName(p)}
          </IonItem>
        )}
      />
    </IonList>
  );
}
