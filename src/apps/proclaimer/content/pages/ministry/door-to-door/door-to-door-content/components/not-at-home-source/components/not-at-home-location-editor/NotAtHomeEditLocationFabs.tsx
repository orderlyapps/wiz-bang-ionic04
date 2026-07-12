import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { checkmark, close } from "ionicons/icons";

type NotAtHomeEditLocationFabsProps = {
  onSave: () => void;
  onCancel: () => void;
};

const SAVE_FAB_OFFSET = 72;

export function NotAtHomeEditLocationFabs({ onSave, onCancel }: NotAtHomeEditLocationFabsProps) {
  return (
    <>
      <IonFab vertical="bottom" horizontal="start" slot="fixed">
        <IonFabButton color="danger" onClick={onCancel}>
          <IonIcon icon={close} />
        </IonFabButton>
      </IonFab>

      <IonFab
        vertical="bottom"
        horizontal="start"
        slot="fixed"
        style={{ marginInlineStart: SAVE_FAB_OFFSET }}
      >
        <IonFabButton color="success" onClick={onSave}>
          <IonIcon icon={checkmark} />
        </IonFabButton>
      </IonFab>
    </>
  );
}
