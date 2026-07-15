import { IonItem, IonLabel, IonList } from "@ionic/react";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useLiveQuery } from "@tanstack/react-db";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import type { Publisher } from "@shared/database/schemas/publisher";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Space } from "@ui/components/layout/space/Space";
import { Body } from "@ui/components/display/text/body/Body";

type PublisherListContentProps = {
  filter: (publisher: Publisher) => boolean;
};

function sortPublishers(publishers: Publisher[]) {
  return publishers.sort((a, b) => {
    const lastNameCompare = a.last_name.localeCompare(b.last_name);
    if (lastNameCompare !== 0) return lastNameCompare;

    if (a.display_name && b.display_name) {
      const displayNameCompare = a.display_name.localeCompare(b.display_name);
      if (displayNameCompare !== 0) return displayNameCompare;
    } else if (a.display_name) {
      return -1;
    } else if (b.display_name) {
      return 1;
    }

    return a.first_name.localeCompare(b.first_name);
  });
}

export function PublisherListContent({ filter }: PublisherListContentProps) {
  const { has_elder, has_congregation_admin, is_super_admin } = usePermissions();
  const can_view_details = has_elder || has_congregation_admin || is_super_admin;
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const filtered = sortPublishers(publishers?.filter(filter) || []);

  return (
    <IonList>
      <MultiColumnList
        items={filtered}
        get_id={(p) => p.id ?? ""}
        gap="sm"
        render_item={(p) => {
          const suffix =
            p.type === "special_pioneer"
              ? "special"
              : p.type === "continuous_auxiliary"
                ? "auxiliary"
                : null;
          return (
            <IonItem
              key={p.id}
              button={can_view_details}
              routerLink={can_view_details ? `/publishers/all/${p.id}` : undefined}
            >
              <IonLabel>{getPublisherDisplayName(p)}</IonLabel>
              {suffix && (
                <Body slot="end" color="medium">
                  {suffix}
                </Body>
              )}
            </IonItem>
          );
        }}
      />
      <Space />
    </IonList>
  );
}
