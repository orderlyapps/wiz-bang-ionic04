import { useLiveQuery, eq } from "@tanstack/react-db";
import { reportPermissionCollection } from "@shared/database/collections/report-permission";
import { groupCollection } from "@shared/database/collections/group";
import { publisherCollection } from "@shared/database/collections/publisher";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { useAuthSession } from "@util/app/auth/useAuthSession";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { Group } from "@shared/database/schemas/group";

export function useReportFormGroups(): { groups: Group[]; can_download: boolean } {
  const session = useAuthSession();
  const auth_user_id = session?.user?.id;
  const congregation_id = useStoredCongregation()?.id;
  const { has_reports, has_secretary, has_elder, has_ministerial_servant } = usePermissions();

  const { data: groups_data } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).orderBy(({ g }) => g.name),
  );

  const { data: publishers_data } = useLiveQuery(
    (q) =>
      q
        .from({ p: publisherCollection })
        .where(({ p }) => eq(p.congregation_id, congregation_id ?? "")),
    [congregation_id],
  );

  const { data: report_permissions } = useLiveQuery((q) =>
    q.from({ rp: reportPermissionCollection }),
  );

  const all_groups = (groups_data ?? []).filter(
    (g) => g.congregation_id === congregation_id,
  ) as Group[];

  const my_publisher = (publishers_data ?? []).find((p) => p.auth_id === auth_user_id);
  const my_publisher_id = my_publisher?.id ?? null;
  const my_group_id = my_publisher?.group_id ?? null;
  const my_standing = my_publisher?.standing ?? null;

  const is_overseer_or_assistant = all_groups.some(
    (g) => g.overseer_id === my_publisher_id || g.assistant_id === my_publisher_id,
  );

  const can_download =
    has_reports ||
    has_secretary ||
    has_elder ||
    has_ministerial_servant ||
    my_standing === "elder" ||
    my_standing === "ministerial_servant" ||
    is_overseer_or_assistant;

  if (!can_download || !congregation_id) {
    return { groups: [], can_download: false };
  }

  if (has_secretary) {
    return { groups: all_groups, can_download: true };
  }

  const allowed_group_ids = new Set(
    (report_permissions ?? [])
      .filter((p) => p.auth_user_id === auth_user_id && p.can_edit)
      .map((p) => p.group_id),
  );

  if (my_group_id) {
    allowed_group_ids.add(my_group_id);
  }

  for (const g of all_groups) {
    if (g.overseer_id === my_publisher_id || g.assistant_id === my_publisher_id) {
      if (g.id) allowed_group_ids.add(g.id);
    }
  }

  const groups = all_groups.filter((g) => g.id && allowed_group_ids.has(g.id));

  return { groups, can_download: groups.length > 0 };
}
