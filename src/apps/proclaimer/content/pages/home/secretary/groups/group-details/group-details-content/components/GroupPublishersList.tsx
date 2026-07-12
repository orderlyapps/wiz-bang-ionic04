import { IonList, IonItem, IonLabel } from "@ionic/react";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";
import { Body } from "@ui/components/display/text/body/Body";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";

interface GroupPublishersListProps {
  publishers: Publisher[];
}

export function GroupPublishersList({ publishers }: GroupPublishersListProps) {
  return (
    <>
      <IonItem lines="none" className="ion-margin ion-text-center">
        <IonLabel>
          <Body color="medium" bold>
            {publishers.length} Publisher{publishers.length !== 1 ? "s" : ""}
          </Body>
        </IonLabel>
      </IonItem>

      {publishers.length === 0 ? (
        <div className="ion-padding ion-text-center">
          <Body color="medium">No publishers in this group.</Body>
        </div>
      ) : (
        <IonList>
          <MultiColumnList
            items={publishers}
            get_id={(p) => p.id ?? ""}
            gap="sm"
            render_item={(p) => (
              <IonItem routerLink={`/home/secretary/publishers/${p.id}`}>
                <IonLabel>{getPublisherDisplayName(p)}</IonLabel>
                <DeleteIconButton
                  on_click={() => {
                    publisherCollection.update(p.id ?? "", (draft) => {
                      draft.group_id = null;
                    });
                  }}
                />
              </IonItem>
            )}
          />
        </IonList>
      )}
    </>
  );
}
