import { useLiveQuery } from "@tanstack/react-db";
import { IonList } from "@ionic/react";
import { WeekNavigation } from "@proclaimer-shared/components/navigation/week-navigation/WeekNavigation";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { weekendAssignmentCollection } from "@shared/database/collections/weekend-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import {
  weekendAssignmentIDs,
  weekendAssignmentLabels,
} from "@shared/database/schemas/weekend-assignment";
import type { WeekendAssignment } from "@shared/database/schemas/weekend-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";

type ScheduleContentProps = {
  week_id: string;
};

export function ScheduleContent({ week_id }: ScheduleContentProps) {
  const congregation_id = getStoredCongregation()?.id;
  const permissions = usePermissions();
  const can_edit = permissions.has_weekend || permissions.has_congregation_admin;

  const { data: allAssignments } = useLiveQuery((q) => q.from({ wa: weekendAssignmentCollection }));
  const { data: allPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const is_loading = allAssignments === undefined || allPublishers === undefined;

  if (is_loading) return <Spinner className="flex-center" />;

  const assignments = ((allAssignments as WeekendAssignment[] | undefined) ?? []).filter(
    (a) => a.congregation_id === congregation_id && a.week_id === week_id,
  );

  const publishers = (allPublishers as Publisher[] | undefined) ?? [];

  function getPublisher(assignment_id: string): string | undefined {
    const a = assignments.find((x) => x.assignment_id === assignment_id);
    if (!a) return undefined;
    const pub = publishers.find((p) => p.id === a.participant_id);
    return pub ? getPublisherDisplayName(pub) : undefined;
  }

  return (
    <>
      <WeekNavigation week_id={week_id} />
      <IonList inset>
        {weekendAssignmentIDs.map((id) => (
          <LabelValueItem
            key={id}
            label={weekendAssignmentLabels[id]}
            value={getPublisher(id)}
            label_color="medium"
            router_link={
              can_edit ? `/home/weekend/schedule/${week_id}/assignment/${id}` : undefined
            }
          />
        ))}
      </IonList>
    </>
  );
}
