import type React from "react";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";

interface PermittedPublisher {
  id: string;
  permission_id: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
}

interface PermissionContentProps {
  permitted_publishers: PermittedPublisher[];
  empty_label: string;
  on_delete: (permission_id: string) => void;
  add_modal: React.ReactNode;
}

export function PermissionContent({
  permitted_publishers,
  empty_label,
  on_delete,
  add_modal,
}: PermissionContentProps) {
  return (
    <>
      {add_modal}
      <IonList inset>
        {permitted_publishers.length === 0 ? (
          <IonItem>
            <IonLabel>{empty_label}</IonLabel>
          </IonItem>
        ) : (
          permitted_publishers.map((p) => (
            <IonItem key={p.id}>
              <IonLabel>{`${p.display_name ?? p.first_name} ${p.last_name ?? ""}`}</IonLabel>
              <DeleteIconButton slot="end" on_click={() => on_delete(p.permission_id)} />
            </IonItem>
          ))
        )}
      </IonList>
    </>
  );
}
