import { IonItem, IonCheckbox, IonList, IonListHeader, IonLabel } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { outlineCollection } from "@shared/database/collections/outline";
import { speakerOutlineCollection } from "@shared/database/collections/speaker-outline";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import type { Outline } from "@shared/database/schemas/outline";
import type { SpeakerOutline } from "@shared/database/schemas/speaker-outline";

interface SpeakerOutlinesListProps {
  speaker_id: string;
}

export function SpeakerOutlinesList({ speaker_id }: SpeakerOutlinesListProps) {
  const { data: all_outlines } = useLiveQuery((q) =>
    q.from({ o: outlineCollection }).orderBy(({ o }) => o.id),
  );

  const { data: speaker_outlines } = useLiveQuery(
    (q) =>
      q.from({ so: speakerOutlineCollection }).where(({ so }) => eq(so.speaker_id, speaker_id)),
    [speaker_id],
  );

  const outlines = (all_outlines as Outline[] | undefined) ?? [];
  const speaker_outline_ids = new Set(
    ((speaker_outlines as SpeakerOutline[] | undefined) ?? []).map((so) => so.outline_id),
  );

  function handleToggle(outline_id: string, is_checked: boolean) {
    const key = makeCompositeKey(speaker_id, outline_id);
    if (is_checked) {
      speakerOutlineCollection.insert({ speaker_id, outline_id });
    } else {
      speakerOutlineCollection.delete(key);
    }
  }

  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Outlines</IonLabel>
      </IonListHeader>
      {outlines.map((outline) => (
        <IonItem key={outline.id}>
          <IonCheckbox
            checked={speaker_outline_ids.has(outline.id)}
            onIonChange={(event) => handleToggle(outline.id, event.detail.checked)}
          >
            {outline.id}: {outline.theme}
          </IonCheckbox>
        </IonItem>
      ))}
    </IonList>
  );
}
