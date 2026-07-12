import { ConfirmationAlert } from "@ui/components/display/alert/ConfirmationAlert";
import { handleDeleteLetterWritingAddress } from "../../handlers/handle-delete-letter-writing-address";

type Props = {
  deleteId: string | null;
  onDismiss: () => void;
};

export function DeleteAddressAlert({ deleteId, onDismiss }: Props) {
  const handleDelete = () => {
    if (!deleteId) return;
    handleDeleteLetterWritingAddress(deleteId);
    onDismiss();
  };

  return (
    <ConfirmationAlert
      is_open={!!deleteId}
      header="Delete Address"
      message="Are you sure you want to delete this address?"
      cancel_text="Cancel"
      confirm_text="Delete"
      confirm_color="danger"
      on_cancel={onDismiss}
      on_confirm={handleDelete}
    />
  );
}
