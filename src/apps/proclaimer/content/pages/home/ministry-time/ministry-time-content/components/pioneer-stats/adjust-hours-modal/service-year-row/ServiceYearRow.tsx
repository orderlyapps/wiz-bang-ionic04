import { IonItem, IonLabel, IonInput, IonBadge, IonButton, IonNote } from "@ionic/react";
import { useState } from "react";
import { DEFAULT_REGULAR_PIONEER_YEARLY_HOURS } from "../../../../hooks/usePioneerSettings";

interface ServiceYearRowProps {
  service_year: string;
  hours: number;
  is_current: boolean;
  on_save: (hours: number) => void;
}

export function ServiceYearRow({ service_year, hours, is_current, on_save }: ServiceYearRowProps) {
  const [value, set_value] = useState(String(hours));
  const is_default = hours === DEFAULT_REGULAR_PIONEER_YEARLY_HOURS;

  function handleSave() {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed > 0) {
      on_save(parsed);
    }
  }

  return (
    <IonItem>
      <IonLabel>
        <h2>
          {service_year}
          {is_current && (
            <IonBadge color="primary" style={{ marginLeft: 8 }}>
              Current
            </IonBadge>
          )}
        </h2>
        {is_default && (
          <IonNote color="medium">Default: {DEFAULT_REGULAR_PIONEER_YEARLY_HOURS}h</IonNote>
        )}
      </IonLabel>
      <IonInput
        slot="end"
        type="number"
        value={value}
        onIonInput={(e) => set_value(e.detail.value ?? "")}
        onIonBlur={handleSave}
        style={{ maxWidth: 100, textAlign: "right" }}
      />
      <IonButton slot="end" fill="clear" size="small" onClick={handleSave}>
        Save
      </IonButton>
    </IonItem>
  );
}
