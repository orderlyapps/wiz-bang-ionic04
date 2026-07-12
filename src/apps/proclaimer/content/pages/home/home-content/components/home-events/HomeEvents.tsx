import { and, eq, gte, useLiveQuery } from "@tanstack/react-db";
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
import { format } from "date-fns";
import { eventCollection } from "@shared/database/collections/event";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { EventItem } from "@proclaimer-content/pages/schedules/events/components/event-item/EventItem";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import { useAccordionState } from "@util/hooks/use-accordion-state/useAccordionState";

export function HomeEvents() {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;
  const permissions = usePermissions();
  const today_str = format(new Date(), "yyyy-MM-dd");
  const { value, onIonChange } = useAccordionState(localStorageKeys.homeEventsAccordion, "events");

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

  const upcoming_events = events?.slice(0, 3) ?? [];

  if (!upcoming_events.length) {
    return null;
  }

  return (
    <IonAccordionGroup value={value} onIonChange={onIonChange}>
      <IonAccordion value="events">
        <IonItem slot="header">
          <IonLabel>
            <Heading>Events</Heading>
          </IonLabel>
        </IonItem>
        <div slot="content">
          <IonList>
            {upcoming_events.map((event) => (
              <EventItem key={event.id} event={event} edit_href={edit_href?.(event.id)} />
            ))}
          </IonList>
          <NavItem
            label="See more"
            to="/home/events"
            label_class="ion-text-end"
            size="sm"
            lines="none"
          />
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
}
