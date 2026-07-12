import { and, eq, gte, useLiveQuery } from "@tanstack/react-db";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import { format } from "date-fns";
import { eventCollection } from "@shared/database/collections/event";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { groupEventsByMonth } from "../groupEventsByMonth";
import { EventMonthGroup } from "../components/event-month-group/EventMonthGroup";

export function EventsContent() {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;
  const permissions = usePermissions();
  const today_str = format(new Date(), "yyyy-MM-dd");

  const can_edit =
    permissions.has_events || permissions.has_congregation_admin || permissions.is_super_admin;

  const edit_href = can_edit ? (event_id: string) => `/home/events/edit/${event_id}` : undefined;

  const { data: events } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ e: eventCollection })
            .where(({ e }) =>
              and(eq(e.congregation_id, congregation_id), gte(e.start_date, today_str)),
            )
            .orderBy(({ e }) => e.start_date)
        : undefined,
    [congregation_id, today_str],
  );

  if (!events?.length) {
    return (
      <IonList>
        <IonItem lines="none">
          <IonLabel>
            <Body>No events</Body>
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }

  const groups = groupEventsByMonth(events);

  return (
    <>
      {groups.map((group) => (
        <EventMonthGroup key={group.label} group={group} edit_href={edit_href} />
      ))}
      <Space />
    </>
  );
}
