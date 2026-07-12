import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";

interface VisitingSpeakerDetailHeaderProps {
  speaker_id: string;
}

export function VisitingSpeakerDetailHeader({ speaker_id }: VisitingSpeakerDetailHeaderProps) {
  const { data } = useLiveQuery(
    (q) => q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, speaker_id)),
    [speaker_id],
  );

  const speaker = (data as Publisher[] | undefined)?.[0];
  const title = speaker ? getPublisherDisplayName(speaker) : "Speaker";

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/speaker/visiting-speakers" />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  );
}
