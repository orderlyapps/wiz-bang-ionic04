import { useState } from "react";
import { IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { congregationCollection } from "@shared/database/collections/congregation";
import { AddCongregationAlert } from "@proclaimer-shared/components/add-congregation-alert/AddCongregationAlert";
import { useAddCongregation } from "./hooks/use-add-congregation/useAddCongregation";
import type { Congregation } from "@shared/database/schemas/congregation";

const ADD_NEW_CONGREGATION_VALUE = "add_new";

interface CongregationSelectProps {
  value: string | null | undefined;
  on_change: (congregation_id: string) => void;
}

export function CongregationSelect({ value, on_change }: CongregationSelectProps) {
  const [is_add_alert_open, set_is_add_alert_open] = useState(false);

  const { data: congregations_data } = useLiveQuery((q) =>
    q.from({ c: congregationCollection }).orderBy(({ c }) => c.name),
  );

  const congregations = (congregations_data as Congregation[] | undefined) ?? [];

  const { add_congregation } = useAddCongregation({
    congregations,
    on_created: on_change,
  });

  function handleSelect(value: string) {
    if (value === ADD_NEW_CONGREGATION_VALUE) {
      set_is_add_alert_open(true);
      return;
    }
    on_change(value);
  }

  return (
    <>
      <IonItem>
        <IonSelect
          label="Congregation"
          labelPlacement="stacked"
          value={value}
          onIonChange={(e) => handleSelect(e.detail.value)}
        >
          {congregations.map((c) => (
            <IonSelectOption key={c.id} value={c.id}>
              {c.name}
            </IonSelectOption>
          ))}
          <IonSelectOption value={ADD_NEW_CONGREGATION_VALUE}>Add New...</IonSelectOption>
        </IonSelect>
      </IonItem>
      <AddCongregationAlert
        is_open={is_add_alert_open}
        on_dismiss={() => set_is_add_alert_open(false)}
        on_add={add_congregation}
      />
    </>
  );
}
