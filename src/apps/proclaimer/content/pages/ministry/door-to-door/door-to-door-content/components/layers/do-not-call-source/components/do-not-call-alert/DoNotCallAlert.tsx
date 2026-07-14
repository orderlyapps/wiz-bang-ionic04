import { useEffect, useRef, useState } from "react";
import { IonAlert, type AlertButton } from "@ionic/react";
import { formatDistanceToNow, isValid } from "date-fns";
import { ConfirmationAlert } from "@ui/components/display/alert/ConfirmationAlert";
import type { DoNotCall } from "../../types";

type DoNotCallAlertProps = {
  selected: DoNotCall | null;
  onDismiss: () => void;
  onDelete?: (id: string) => void;
  onEditLocation?: () => void;
};

export function DoNotCallAlert({
  selected,
  onDismiss,
  onDelete,
  onEditLocation,
}: DoNotCallAlertProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const selectedIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (selected?.id) {
      selectedIdRef.current = selected.id;
    }
  }, [selected?.id]);

  const address = selected
    ? `${selected.house_number}${selected.unit_number ? `/${selected.unit_number}` : ""} ${selected.street}, ${selected.suburb}`
    : "";

  const subHeader = selected?.notes || undefined;

  const addedText = selected?.created_at
    ? (() => {
        const date = new Date(selected.created_at);
        return isValid(date)
          ? `Added ${formatDistanceToNow(date, { addSuffix: true })}`
          : undefined;
      })()
    : undefined;

  const buttons: AlertButton[] = [{ text: "OK", role: "cancel", handler: onDismiss }];
  if (selected && onDelete) {
    buttons.unshift({
      text: "Delete",
      role: "destructive",
      handler: () => setShowConfirmation(true),
    });
  }
  if (selected && onEditLocation) {
    buttons.unshift({
      text: "Edit Location",
      handler: () => {
        onEditLocation();
        onDismiss();
      },
    });
  }
  // buttons.unshift({
  //   text: "Info",
  //   handler: () => {
  //     window.open(
  //       "https://www.jw.org/finder?srcid=jwlshare&wtlocale=E&prefer=lang&docid=201994204",
  //       "_blank",
  //     );
  //     onDismiss();
  //   },
  // });

  function handleConfirmDelete() {
    const id = selected?.id ?? selectedIdRef.current;
    if (id && onDelete) {
      onDelete(id);
    }
    setShowConfirmation(false);
    onDismiss();
  }

  return (
    <>
      <IonAlert
        isOpen={!!selected}
        header={address}
        subHeader={subHeader}
        message={addedText}
        buttons={buttons}
      />
      <ConfirmationAlert
        is_open={showConfirmation}
        header="Delete Do Not Call"
        message="Are you sure you want to delete this do not call?"
        confirm_text="Delete"
        confirm_color="danger"
        cancel_text="Cancel"
        on_confirm={handleConfirmDelete}
        on_cancel={() => setShowConfirmation(false)}
      />
    </>
  );
}
