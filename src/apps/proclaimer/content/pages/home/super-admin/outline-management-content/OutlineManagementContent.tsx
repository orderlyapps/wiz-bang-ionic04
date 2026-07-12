import { IonAlert, IonList } from "@ionic/react";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { OutlineForm } from "./components/outline-form/OutlineForm";
import { OutlineList } from "./components/outline-list/OutlineList";
import { useOutlineManagement } from "./hooks/use-outline-management/useOutlineManagement";

export function OutlineManagementContent() {
  const {
    outlines,
    is_form_open,
    editing_outline,
    delete_outline_id,
    open_new,
    open_edit,
    close_form,
    save_outline,
    request_delete,
    cancel_delete,
    confirm_delete,
  } = useOutlineManagement();

  return (
    <>
      <TextButton label="New Outline" on_click={open_new} />
      <Space size="sm" />
      <IonList>
        <OutlineList outlines={outlines} on_edit={open_edit} on_delete={request_delete} />
      </IonList>
      <OutlineForm
        is_open={is_form_open}
        outline={editing_outline}
        on_save={save_outline}
        on_dismiss={close_form}
      />
      <IonAlert
        isOpen={delete_outline_id !== null}
        onDidDismiss={cancel_delete}
        header="Delete Outline"
        message="Are you sure you want to delete this outline?"
        buttons={[
          { text: "Cancel", role: "cancel" },
          { text: "Delete", handler: confirm_delete },
        ]}
      />
    </>
  );
}
