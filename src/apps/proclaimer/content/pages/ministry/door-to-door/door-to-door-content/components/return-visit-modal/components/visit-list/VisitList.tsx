import { IonItem, IonLabel, IonText } from "@ionic/react";
import type { VisitLogEntry } from "@shared/database/schemas/return-visit";

type VisitListProps = {
  visits: VisitLogEntry[];
};

export function VisitList({ visits }: VisitListProps) {
  const sorted = [...visits].sort((a, b) =>
    b.visited_at.localeCompare(a.visited_at),
  );

  if (sorted.length === 0) {
    return (
      <IonItem lines="none">
        <IonLabel>
          <IonText color="medium">
            <p>No visits recorded yet.</p>
          </IonText>
        </IonLabel>
      </IonItem>
    );
  }

  return (
    <>
      {sorted.map((visit) => {
        const date = new Date(visit.visited_at);
        const dateStr = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const timeStr = date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        });

        return (
          <IonItem key={visit.id}>
            <IonLabel>
              <h3>{dateStr} at {timeStr}</h3>
              {visit.notes && (
                <IonText color="medium">
                  <p>{visit.notes}</p>
                </IonText>
              )}
            </IonLabel>
          </IonItem>
        );
      })}
    </>
  );
}
