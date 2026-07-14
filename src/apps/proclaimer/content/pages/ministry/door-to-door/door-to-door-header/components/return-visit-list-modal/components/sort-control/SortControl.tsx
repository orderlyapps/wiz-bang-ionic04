import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

export type SortMode = "recent" | "suburb" | "first_name";

type SortControlProps = {
  value: SortMode;
  on_change: (mode: SortMode) => void;
};

export function SortControl({ value, on_change }: SortControlProps) {
  return (
    <IonSegment value={value} onIonChange={(e) => on_change(e.detail.value as SortMode)} scrollable>
      <IonSegmentButton value="recent">
        <IonLabel>Longest Since Visit</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="suburb">
        <IonLabel>Suburb</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="first_name">
        <IonLabel>First Name</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
}
