import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { groupCollection } from "@shared/database/collections/group";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { isListablePublisher } from "@proclaimer-content/pages/home/secretary/groups/group-details/group-details-content/groupPublisherUtils";
import { Heading } from "@ui/components/display/text/heading/Heading";

export function GroupsContent() {
  const { has_elder, has_congregation_admin, is_super_admin } = usePermissions();
  const can_view_details = has_elder || has_congregation_admin || is_super_admin;
  const congregation_id = getStoredCongregation()?.id;

  const { data: groups_data, isLoading: is_groups_loading } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).orderBy(({ g }) => g.name),
  );

  const { data: publishers_data, isLoading: is_publishers_loading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  if (is_groups_loading || is_publishers_loading) {
    return <Spinner />;
  }

  const groups = (groups_data ?? []).filter((g) => g.congregation_id === congregation_id);
  const publishers = (publishers_data ?? []) as Publisher[];

  const getGroupPublishers = (group_id: string) => {
    return publishers
      .filter((p) => p.group_id === group_id && isListablePublisher(p, false))
      .sort((a, b) => {
        const last = a.last_name.localeCompare(b.last_name);
        if (last !== 0) return last;
        const a_first = a.display_name ?? a.first_name;
        const b_first = b.display_name ?? b.first_name;
        return a_first.localeCompare(b_first);
      });
  };

  if (groups.length === 0) {
    return (
      <div className="ion-padding ion-text-center">
        <Body color="medium">No groups found.</Body>
      </div>
    );
  }

  return (
    <>
      <IonAccordionGroup>
        {groups.map((group) => {
          const group_publishers = getGroupPublishers(group.id ?? "");
          return (
            <IonAccordion key={group.id} value={group.id ?? ""}>
              <IonItem slot="header">
                <IonLabel>
                  <Heading>{group.name} </Heading>
                </IonLabel>
                {group_publishers.length > 0 && (
                  <div slot="end">
                    <Body>{group_publishers.length}</Body>
                  </div>
                )}
              </IonItem>
              <div slot="content">
                {group_publishers.length === 0 ? (
                  <div className="ion-padding ion-text-center">
                    <Body color="medium">No publishers in this group.</Body>
                  </div>
                ) : (
                  <IonList>
                    <MultiColumnList
                      items={group_publishers}
                      get_id={(p) => p.id ?? ""}
                      gap="sm"
                      render_item={(p) => {
                        const role =
                          p.id === group.overseer_id
                            ? "overseer"
                            : p.id === group.assistant_id
                              ? "assistant"
                              : null;
                        return (
                          <IonItem
                            button={can_view_details}
                            routerLink={can_view_details ? `/publishers/all/${p.id}` : undefined}
                          >
                            <IonLabel>{getPublisherDisplayName(p)}</IonLabel>
                            {role && <IonNote slot="end">{role}</IonNote>}
                          </IonItem>
                        );
                      }}
                    />
                  </IonList>
                )}
                <Space size="xl" />
              </div>
            </IonAccordion>
          );
        })}
      </IonAccordionGroup>
      <Space />
    </>
  );
}
