import { IonItem, IonLabel, IonList, IonSkeletonText } from "@ionic/react";

const SKELETON_COUNT = 8;

export function CongregationSkeleton() {
  return (
    <IonList>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <IonItem key={i}>
          <IonLabel>
            <IonSkeletonText animated style={{ width: `${50 + (i % 4) * 12}%` }} />
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
