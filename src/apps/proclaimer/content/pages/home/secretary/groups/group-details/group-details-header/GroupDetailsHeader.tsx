import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { groupCollection } from "@shared/database/collections/group";

interface GroupDetailsHeaderProps {
  group_id: string;
  on_add_click: () => void;
}

export function GroupDetailsHeader({ group_id, on_add_click }: GroupDetailsHeaderProps) {
  const { data } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).where(({ g }) => eq(g.id, group_id)),
  );

  const group = data?.[0];

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/secretary/groups" />
      </IonButtons>
      <IonTitle>{group ? group.name : "Group"}</IonTitle>
      <IonButtons slot="end">
        <AddIconButton on_click={on_add_click} />
      </IonButtons>
    </IonToolbar>
  );
}
