import { useLiveQuery } from "@tanstack/react-db";
import { ministerialServantPermissionCollection } from "@shared/database/collections/ministerial-servant-permission";
import { useAddPermission } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/hooks/useAddPermission";
import { GenericPermissionModal } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-modal/GenericPermissionModal";

interface AddPublisherModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function AddPublisherModal({ is_open, on_dismiss }: AddPublisherModalProps) {
  const { data: permissions } = useLiveQuery((q) =>
    q.from({ msp: ministerialServantPermissionCollection }),
  );

  const { handleAdd } = useAddPermission({
    permissions,
    on_insert: (auth_user_id, congregation_id) =>
      ministerialServantPermissionCollection.insert({
        auth_user_id,
        congregation_id,
        can_edit: true,
      }),
    on_update: (key) =>
      ministerialServantPermissionCollection.update(key, (draft) => {
        draft.can_edit = true;
      }),
    on_dismiss,
  });

  return (
    <GenericPermissionModal
      is_open={is_open}
      on_dismiss={on_dismiss}
      permissions={permissions}
      on_add_permission={handleAdd}
      modal_title="Add Ministerial Servant"
      gender_filter="male"
    />
  );
}
