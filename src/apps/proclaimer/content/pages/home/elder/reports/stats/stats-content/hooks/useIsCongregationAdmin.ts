import { useLiveQuery } from "@tanstack/react-db";
import { congregationAdminCollection } from "@shared/database/collections/congregation-admin";
import { useAuthSession } from "@util/app/auth/useAuthSession";
import { getStoredCongregation } from "@util/app/congregation/utils";

export function useIsCongregationAdmin() {
  const session = useAuthSession();
  const auth_user_id = session?.user?.id;
  const congregation_id = getStoredCongregation()?.id;

  const { data: congregation_admins } = useLiveQuery((q) =>
    q.from({ ca: congregationAdminCollection }),
  );

  const is_congregation_admin = (congregation_admins ?? []).some(
    (ca) => ca.auth_user_id === auth_user_id && ca.congregation_id === congregation_id,
  );

  return {
    is_congregation_admin,
    isLoading: session === undefined,
  };
}
