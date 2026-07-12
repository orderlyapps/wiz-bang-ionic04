import { useLiveQuery } from "@tanstack/react-db";
import { secretaryPermissionCollection } from "@shared/database/collections/secretary-permission";
import { usePermittedPublishers } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/hooks/usePermittedPublishers";
import { PermissionContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-content/PermissionContent";
import { AddPublisherModal } from "./components/add-publisher-modal/AddPublisherModal";

interface SecretaryContentProps {
  show_add_modal: boolean;
  on_dismiss_add_modal: () => void;
}

export function SecretaryContent({ show_add_modal, on_dismiss_add_modal }: SecretaryContentProps) {
  const { data: permissions } = useLiveQuery((q) => q.from({ sp: secretaryPermissionCollection }));

  const { permitted_publishers, handleDelete } = usePermittedPublishers({
    permissions,
    on_delete: (key) =>
      secretaryPermissionCollection.update(key, (draft) => {
        draft.can_edit = false;
      }),
  });

  return (
    <PermissionContent
      permitted_publishers={permitted_publishers}
      empty_label="No publishers with secretary permission."
      on_delete={handleDelete}
      add_modal={<AddPublisherModal is_open={show_add_modal} on_dismiss={on_dismiss_add_modal} />}
    />
  );
}
