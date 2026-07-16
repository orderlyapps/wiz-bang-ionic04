import {
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { eq } from "@tanstack/react-db";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { outlineCollection } from "@shared/database/collections/outline";
import { speakerOutlineCollection } from "@shared/database/collections/speaker-outline";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import type { Outline } from "@shared/database/schemas/outline";
import type { SpeakerOutline } from "@shared/database/schemas/speaker-outline";

interface EditSpeakerOutlinesModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  speaker_id: string | undefined;
}

export function EditSpeakerOutlinesModal({
  is_open,
  on_dismiss,
  speaker_id,
}: EditSpeakerOutlinesModalProps) {
  const { data: all_outlines } = useLiveQuery((q) =>
    q.from({ o: outlineCollection }).orderBy(({ o }) => o.id),
  );

  const { data: speaker_outlines } = useLiveQuery(
    (q) => {
      if (!speaker_id) return undefined;
      return q
        .from({ so: speakerOutlineCollection })
        .where(({ so }) => eq(so.speaker_id, speaker_id));
    },
    [speaker_id],
  );

  const outlines = (all_outlines as Outline[] | undefined) ?? [];
  const speaker_outline_ids = new Set(
    ((speaker_outlines as SpeakerOutline[] | undefined) ?? []).map((so) => so.outline_id),
  );

  function handleToggle(outline_id: string, is_checked: boolean) {
    if (!speaker_id || !outline_id) return;
    const key = makeCompositeKey(speaker_id, outline_id);
    if (is_checked) {
      speakerOutlineCollection.insert({ speaker_id, outline_id });
    } else {
      speakerOutlineCollection.delete(key);
    }
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Speaker Outlines</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
      </IonContent>
    </ResponsiveModal>
  );
}
