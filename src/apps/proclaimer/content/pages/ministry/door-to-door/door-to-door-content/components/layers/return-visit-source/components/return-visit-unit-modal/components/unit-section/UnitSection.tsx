import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import type { ReturnVisit } from "../../../../types";

type UnitSectionProps = {
  units: ReturnVisit[];
  onSelect: (unit: ReturnVisit) => void;
  onDelete: (unit: ReturnVisit) => void;
};

export function UnitSection({ units, onSelect, onDelete }: UnitSectionProps) {
  return (
    <IonList>
      {units.map((unit) => (
        <IonItem key={unit.id} button onClick={() => onSelect(unit)} detail>
          <IonLabel>Unit {unit.unit_number || "—"}</IonLabel>
          <IonButton
            slot="end"
            color="danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(unit);
            }}
            className="ion-margin"
          >
            <IonIcon icon={trashOutline} slot="icon-only" aria-label="Delete" />
          </IonButton>
        </IonItem>
      ))}
    </IonList>
  );
}
