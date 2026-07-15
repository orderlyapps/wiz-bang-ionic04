import { IonItem, IonLabel, IonNote } from "@ionic/react";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";

interface InactivePublisherItemProps {
  publisher: Publisher;
}

export function InactivePublisherItem({ publisher }: InactivePublisherItemProps) {
  const name = getPublisherDisplayName(publisher, "last_first");
  const type_label = publisher.type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <IonItem routerLink={`/home/secretary/publishers/${publisher.id}`} button detail>
      <IonLabel>{name}</IonLabel>
      <IonNote slot="end" color="medium">
        {type_label}
      </IonNote>
    </IonItem>
  );
}
