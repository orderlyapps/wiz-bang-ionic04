import { IonItem, IonLabel, IonList } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { groupCollection } from "@shared/database/collections/group";
import { getStoredCongregation } from "@util/app/congregation/utils";

export function ReportsContent() {
  const congregation_id = getStoredCongregation()?.id;

  const { data: groups } = useLiveQuery((q) => q.from({ g: groupCollection }));

  const congregation_groups = groups
    .filter((g) => g.congregation_id === congregation_id)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <IonList inset>
      {congregation_groups.length === 0 ? (
        <IonItem>
          <IonLabel>No groups found.</IonLabel>
        </IonItem>
      ) : (
        congregation_groups.map((g) => (
          <IonItem key={g.id}>
            <IonLabel>{g.name}</IonLabel>
          </IonItem>
        ))
      )}
    </IonList>
  );
}
