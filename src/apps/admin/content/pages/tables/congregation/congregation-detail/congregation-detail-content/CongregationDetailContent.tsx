import { IonList } from "@ionic/react";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { congregationCollection } from "@shared/database/collections/congregation";
import { useParams } from "react-router-dom";

export function CongregationDetailContent() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useLiveQuery((q) =>
    q
      .from({ c: congregationCollection })
      .where(({ c }) => eq(c.id, id))
      .orderBy(({ c }) => c.name)
      .limit(1),
  );

  const congregation = data?.[0];

  if (!congregation) {
    return isLoading ? <Spinner centered /> : <p>Congregation not found.</p>;
  }

  return (
    <IonList>
      <LabelValueItem label="Name" value={congregation.name} />
      <LabelValueItem label="ID" value={congregation.id ?? ""} />
    </IonList>
  );
}
