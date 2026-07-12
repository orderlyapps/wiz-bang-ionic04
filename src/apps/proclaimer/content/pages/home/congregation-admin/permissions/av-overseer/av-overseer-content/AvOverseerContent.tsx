import { useLiveQuery } from "@tanstack/react-db";
import { avOverseerPermissionCollection } from "@shared/database/collections/av-overseer-permission";
import { usePermittedPublishers } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/hooks/usePermittedPublishers";
import { PermissionContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-content/PermissionContent";
import { AddPublisherModal } from "./components/add-publisher-modal/AddPublisherModal";

interface AvOverseerContentProps {
  show_add_modal: boolean;
  on_dismiss_add_modal: () => void;
}

export function AvOverseerContent({
  show_add_modal,
  on_dismiss_add_modal,
}: AvOverseerContentProps) {
  const { data: permissions } = useLiveQuery((q) => q.from({ ap: avOverseerPermissionCollection }));

  const { permitted_publishers, handleDelete } = usePermittedPublishers({
    permissions,
    on_delete: (key) =>
      avOverseerPermissionCollection.update(key, (draft) => {
        draft.can_edit = false;
      }),
  });

  return (
    <PermissionContent
      permitted_publishers={permitted_publishers}
      empty_label="No publishers with AV overseer permission."
      on_delete={handleDelete}
      add_modal={<AddPublisherModal is_open={show_add_modal} on_dismiss={on_dismiss_add_modal} />}
    />
  );
}
