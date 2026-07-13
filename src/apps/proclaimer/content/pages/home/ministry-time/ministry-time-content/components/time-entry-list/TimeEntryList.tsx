import { IonItem, IonLabel, IonList, IonText } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import type { MinistryTimeEntry } from "../../hooks/useMinistryTime";

interface TimeEntryListProps {
  entries: MinistryTimeEntry[];
  on_delete: (id: string) => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatMinutes(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function TimeEntryList({ entries, on_delete }: TimeEntryListProps) {
  if (entries.length === 0) {
    return (
      <IonItem lines="none" className="ion-padding ion-text-center">
        <IonLabel>
          <Body color="medium">No entries yet. Add your first one above.</Body>
        </IonLabel>
      </IonItem>
    );
  }

  return (
    <IonList>
      {entries.map((entry) => (
        <IonItem key={entry.id}>
          <IonLabel>
            <Body bold>{formatDate(entry.date)}</Body>
            <IonText color="medium">
              <p style={{ margin: 0 }}>
                {entry.start_time} – {entry.end_time}
              </p>
            </IonText>
            {entry.note && (
              <IonText color="medium">
                <p style={{ margin: 0 }}>{entry.note}</p>
              </IonText>
            )}
          </IonLabel>
          <IonText slot="end" color="primary">
            <Body>{formatMinutes(entry.minutes)}</Body>
          </IonText>
          <DeleteIconButton
            slot="end"
            alert_header="Delete Entry"
            alert_message="Delete this ministry time entry?"
            on_click={() => on_delete(entry.id)}
          />
        </IonItem>
      ))}
    </IonList>
  );
}
