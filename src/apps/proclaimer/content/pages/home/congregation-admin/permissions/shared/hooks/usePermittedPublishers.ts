import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";

interface PermissionRecord {
  $key: string;
  auth_user_id: string;
  congregation_id: string;
  can_edit: boolean;
}

interface UsePermittedPublishersProps {
  permissions: PermissionRecord[];
  on_delete: (permission_key: string) => void;
}

export function usePermittedPublishers({ permissions, on_delete }: UsePermittedPublishersProps) {
  const congregation_id = getStoredCongregation()?.id;

  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const congregation_permissions = permissions.filter(
    (p) => p.congregation_id === congregation_id && p.can_edit,
  );

  const permitted_publishers = Object.values(
    congregation_permissions
      .map((perm) => {
        const publisher = publishers.find((p) => p.auth_id === perm.auth_user_id);
        if (!publisher?.id) return null;
        return {
          id: publisher.id,
          permission_id: perm.$key,
          first_name: publisher.first_name ?? null,
          last_name: publisher.last_name ?? null,
          display_name: publisher.display_name ?? null,
        };
      })
      .filter((p) => p !== null)
      .reduce<
        Record<
          string,
          {
            id: string;
            permission_id: string;
            first_name: string | null;
            last_name: string | null;
            display_name: string | null;
          }
        >
      >((acc, p) => {
        if (!acc[p.id]) acc[p.id] = p;
        return acc;
      }, {}),
  ).sort((a, b) => (a.last_name ?? "").localeCompare(b.last_name ?? ""));

  return { permitted_publishers, handleDelete: on_delete };
}
