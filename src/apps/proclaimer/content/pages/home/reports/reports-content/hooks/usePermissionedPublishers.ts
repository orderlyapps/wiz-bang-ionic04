import { useLiveQuery, inArray, eq, isNull, and } from "@tanstack/react-db";
import { reportPermissionCollection } from "@shared/database/collections/report-permission";
import { congregationAdminCollection } from "@shared/database/collections/congregation-admin";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useAuthSession } from "@util/app/auth/useAuthSession";
import { getStoredCongregation } from "@util/app/congregation/utils";

export function usePermissionedPublishers() {
  const session = useAuthSession();
  const auth_user_id = session?.user?.id;
  const congregation_id = getStoredCongregation()?.id;

  const { data: congregation_admins } = useLiveQuery((q) =>
    q.from({ ca: congregationAdminCollection }),
  );

  const { data: permissions } = useLiveQuery((q) => q.from({ rp: reportPermissionCollection }));

  const is_congregation_admin = (congregation_admins ?? []).some(
    (ca) => ca.auth_user_id === auth_user_id && ca.congregation_id === congregation_id,
  );

  const allowed_group_ids = (permissions ?? [])
    .filter((p) => p.auth_user_id === auth_user_id && p.can_edit)
    .map((p) => p.group_id);

  const { data: publishers, isLoading } = useLiveQuery(
    (q) => {
      if (is_congregation_admin && congregation_id) {
        return q
          .from({ p: publisherCollection })
          .where(({ p }) => and(eq(p.congregation_id, congregation_id), isNull(p.archived_at)))
          .orderBy(({ p }) => p.last_name);
      }
      if (allowed_group_ids.length === 0) return undefined;
      return q
        .from({ p: publisherCollection })
        .where(({ p }) => and(inArray(p.group_id, allowed_group_ids), isNull(p.archived_at)))
        .orderBy(({ p }) => p.last_name);
    },
    [is_congregation_admin, congregation_id, allowed_group_ids.join(",")],
  );

  const has_access = is_congregation_admin || allowed_group_ids.length > 0;

  return {
    publishers: (publishers ?? []).filter(
      (p) =>
        p.type !== "inactive" &&
        p.type !== "speaker" &&
        p.type !== "associate" &&
        p.type !== "circuit_overseer",
    ),
    has_access,
    isLoading: isLoading || session === undefined,
  };
}
