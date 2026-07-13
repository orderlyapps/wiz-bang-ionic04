import { IonItem, IonLabel, IonList } from "@ionic/react";
import type { ReturnVisit } from "../../../../types";

type UnitSectionProps = {
  units: ReturnVisit[];
  onSelect: (unit: ReturnVisit) => void;
};

export function UnitSection({ units, onSelect }: UnitSectionProps) {
  return (
    <IonList>
      {units.map((unit) => (
        <IonItem key={unit.id} button onClick={() => onSelect(unit)} detail>
          <IonLabel>Unit {unit.unit_number || "—"}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
