import { IonItem, IonLabel, IonSkeletonText } from "@ionic/react";

export function LabelValueItemSkeleton() {
  return (
    <IonItem>
      <IonLabel>
        <IonSkeletonText animated style={{ width: "40%", height: "12px" }} />
        <p>
          <IonSkeletonText animated style={{ width: "65%", height: "14px" }} />
        </p>
      </IonLabel>
    </IonItem>
  );
}
