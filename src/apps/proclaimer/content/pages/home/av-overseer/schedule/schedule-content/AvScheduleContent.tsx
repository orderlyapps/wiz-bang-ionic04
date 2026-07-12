import { useLiveQuery } from "@tanstack/react-db";
import { IonList } from "@ionic/react";
import { WeekNavigation } from "@proclaimer-shared/components/navigation/week-navigation/WeekNavigation";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { avAssignmentCollection } from "@shared/database/collections/av-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { AvAssignment } from "@shared/database/schemas/av-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { getAvAssignmentRows } from "./helper/getAvAssignmentRows";
import { AvAssignmentCard } from "./components/av-assignment-card/AvAssignmentCard";
import type { AvAssignmentGroup, AvScheduleContentProps } from "./helper/types";

export function AvScheduleContent({ week_id, base_path }: AvScheduleContentProps) {
  const congregation_id = getStoredCongregation()?.id;

  const { data: allAssignments } = useLiveQuery((q) => q.from({ aa: avAssignmentCollection }));
  const { data: allPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const is_loading = allAssignments === undefined || allPublishers === undefined;

  if (is_loading) return <Spinner className="flex-center" />;

  const assignments = ((allAssignments as AvAssignment[] | undefined) ?? []).filter(
    (a) => !congregation_id || a.congregation_id === congregation_id,
  );

  const publishers = ((allPublishers as Publisher[] | undefined) ?? []).filter(
    (p) => !congregation_id || p.congregation_id === congregation_id,
  );

  const rows = getAvAssignmentRows(week_id, base_path, assignments, publishers);

  return (
    <>
      <WeekNavigation week_id={week_id} />
      <IonList inset>
        <MultiColumnList<AvAssignmentGroup>
          items={rows}
          get_id={(row) => row.id}
          render_item={(row) => <AvAssignmentCard {...row} />}
          pin_to_first_column={(row) =>
            row.is_header || row.id.startsWith("video") || row.id.startsWith("entrance")
          }
        />
      </IonList>
    </>
  );
}
