import { IonButton, IonItem, IonLabel } from "@ionic/react";
import type { Outline } from "@shared/database/schemas/outline";

interface OutlineListItemProps {
  outline: Outline;
  on_edit: (outline: Outline) => void;
  on_delete: (id: string) => void;
}

export function OutlineListItem({ outline, on_edit, on_delete }: OutlineListItemProps) {
  return (
    <IonItem>
      <IonLabel>
        {outline.id}: {outline.theme}
      </IonLabel>
      <IonButton slot="end" fill="clear" onClick={() => on_edit(outline)}>
        Edit
      </IonButton>
      <IonButton slot="end" fill="clear" color="danger" onClick={() => on_delete(outline.id)}>
        Delete
      </IonButton>
    </IonItem>
  );
}
