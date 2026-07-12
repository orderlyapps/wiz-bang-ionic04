import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import type { NotAtHome } from "../../../../types";

type UnitSectionProps = {
  title: string;
  units: NotAtHome[];
  onMove: (unit: NotAtHome) => void;
  onDelete: (unit: NotAtHome) => void;
};

export function UnitSection({ title, units, onMove, onDelete }: UnitSectionProps) {
  if (units.length === 0) return null;

  return (
    <IonList>
      <IonItem>
        <IonLabel>
          <strong>{title}</strong>
        </IonLabel>
      </IonItem>
      {units.map((unit) => (
        <IonItem key={unit.id}>
          <IonLabel>Unit {unit.unit_number || "—"}</IonLabel>
          <IonButton
            slot="end"
            color="primary"
            onClick={() => onMove(unit)}
            className="ion-margin-end"
          >
            <IonIcon icon={createOutline} slot="icon-only" aria-label="Move" />
          </IonButton>
          <IonButton
            slot="end"
            color="danger"
            onClick={() => onDelete(unit)}
            className="ion-margin"
          >
            <IonIcon icon={trashOutline} slot="icon-only" aria-label="Delete" />
          </IonButton>
        </IonItem>
      ))}
    </IonList>
  );
}
