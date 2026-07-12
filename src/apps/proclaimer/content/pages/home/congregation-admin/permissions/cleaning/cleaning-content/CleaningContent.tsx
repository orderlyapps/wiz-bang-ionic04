import { useLiveQuery } from "@tanstack/react-db";
import { cleanPermissionCollection } from "@shared/database/collections/clean-permission";
import { usePermittedPublishers } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/hooks/usePermittedPublishers";
import { PermissionContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-content/PermissionContent";
import { AddPublisherModal } from "./components/add-publisher-modal/AddPublisherModal";

interface CleaningContentProps {
  show_add_modal: boolean;
  on_dismiss_add_modal: () => void;
}

export function CleaningContent({ show_add_modal, on_dismiss_add_modal }: CleaningContentProps) {
  const { data: permissions } = useLiveQuery((q) => q.from({ cp: cleanPermissionCollection }));

  const { permitted_publishers, handleDelete } = usePermittedPublishers({
    permissions,
    on_delete: (key) =>
      cleanPermissionCollection.update(key, (draft) => {
        draft.can_edit = false;
      }),
  });

  return (
    <PermissionContent
      permitted_publishers={permitted_publishers}
      empty_label="No publishers with cleaning permission."
      on_delete={handleDelete}
      add_modal={<AddPublisherModal is_open={show_add_modal} on_dismiss={on_dismiss_add_modal} />}
    />
  );
}
