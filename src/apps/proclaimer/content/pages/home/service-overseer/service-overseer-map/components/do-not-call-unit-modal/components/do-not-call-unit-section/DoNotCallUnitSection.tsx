import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import type { DoNotCall } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/layers/do-not-call-source/types";

type DoNotCallUnitSectionProps = {
  units: DoNotCall[];
  onDelete: (unit: DoNotCall) => void;
};

export function DoNotCallUnitSection({ units, onDelete }: DoNotCallUnitSectionProps) {
  if (units.length === 0) return null;

  return (
    <IonList>
      {units.map((unit) => (
        <IonItem key={unit.id}>
          <IonLabel>
            Unit {unit.unit_number || "—"}
            {unit.notes ? <p>{unit.notes}</p> : null}
          </IonLabel>
          <IonButton slot="end" color="danger" onClick={() => onDelete(unit)}>
            <IonIcon icon={trashOutline} slot="icon-only" aria-label="Delete" />
          </IonButton>
        </IonItem>
      ))}
    </IonList>
  );
}
