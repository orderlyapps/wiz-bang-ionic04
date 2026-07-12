import { useState } from "react";
import { IonAlert, IonToast } from "@ionic/react";
import { formatDistanceToNow } from "date-fns";
import { handleDeleteNotAtHome } from "../../handlers/handleDeleteNotAtHome";
import { handleToggleNotAtHomeWrite } from "../../handlers/handleToggleNotAtHomeWrite";
import type { NotAtHome } from "../../types";

type NotAtHomeAlertProps = {
  selected: NotAtHome | null;
  onDismiss: () => void;
  onEditLocation?: () => void;
};

export function NotAtHomeAlert({ selected, onDismiss, onEditLocation }: NotAtHomeAlertProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const record = selected;
  const address = record
    ? `${record.house_number}${record.unit_number ? `/${record.unit_number}` : ""} ${record.street}, ${record.suburb}`
    : "";

  function handleDelete() {
    if (!record) return false;
    try {
      handleDeleteNotAtHome(record.id);
      onDismiss();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to delete not-at-home record",
      );
      return false;
    }
  }

  function handleToggle() {
    if (!record) return false;
    try {
      handleToggleNotAtHomeWrite(record.id, record.write);
      onDismiss();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update not-at-home record",
      );
      return false;
    }
  }

  return (
    <>
      <IonAlert
        isOpen={!!record}
        header={address}
        subHeader={
          record
            ? `Added ${formatDistanceToNow(new Date(record.created_at), { addSuffix: true })}`
            : undefined
        }
        buttons={[
          { text: "Delete", role: "destructive", handler: handleDelete },
          {
            text: record?.write ? "Move to Return List" : "Move to Write List",
            handler: handleToggle,
          },
          { text: "Edit Location", handler: () => onEditLocation?.() },
          { text: "Cancel", role: "cancel", handler: onDismiss },
        ]}
        onDidDismiss={onDismiss}
      />
      <IonToast
        isOpen={!!errorMessage}
        message={errorMessage ?? ""}
        duration={3000}
        color="danger"
        onDidDismiss={() => setErrorMessage(null)}
      />
    </>
  );
}
