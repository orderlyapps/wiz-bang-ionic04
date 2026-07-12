import { getStoredCongregation } from "@util/app/congregation/utils";
import type { Publisher } from "@shared/database/schemas/publisher";

interface PermissionRecord {
  $key: string;
  auth_user_id: string;
  congregation_id: string;
  can_edit: boolean;
}

interface UseAddPermissionProps {
  permissions: PermissionRecord[] | undefined;
  on_insert: (auth_user_id: string, congregation_id: string) => void;
  on_update: (key: string) => void;
  on_dismiss: () => void;
}

export function useAddPermission({
  permissions,
  on_insert,
  on_update,
  on_dismiss,
}: UseAddPermissionProps) {
  const congregation_id = getStoredCongregation()?.id;

  const handleAdd = (publisher: Publisher) => {
    if (!publisher.auth_id || !congregation_id) return;
    const existing_permission = (permissions ?? []).find(
      (p) => p.auth_user_id === publisher.auth_id && p.congregation_id === congregation_id,
    );
    if (existing_permission) {
      on_update(existing_permission.$key);
    } else {
      on_insert(publisher.auth_id, congregation_id);
    }
    on_dismiss();
  };

  return { handleAdd };
}
