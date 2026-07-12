import { useLiveQuery } from "@tanstack/react-db";
import { IonList } from "@ionic/react";
import { groupCollection } from "@shared/database/collections/group";
import { publisherCollection } from "@shared/database/collections/publisher";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { getStoredCongregation } from "@util/app/congregation/utils";
import type { Publisher } from "@shared/database/schemas/publisher";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { isListablePublisher } from "@proclaimer-content/pages/home/secretary/groups/group-details/group-details-content/groupPublisherUtils";

export function GroupsContent() {
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

  const getGroupMemberCount = (group_id: string) => {
    return publishers.filter((p) => p.group_id === group_id && isListablePublisher(p, false))
      .length;
  };

  return (
    <>
      {groups.length === 0 ? (
        <div className="ion-padding ion-text-center">
          <Body color="medium">No groups found.</Body>
        </div>
      ) : (
        <IonList>
          <MultiColumnList
            items={groups}
            get_id={(g) => g.id ?? ""}
            gap="sm"
            render_item={(g) => (
              <NavItem
                to={`/home/secretary/groups/${g.id}`}
                label={g.name + " (" + getGroupMemberCount(g.id ?? "") + ")"}
              />
            )}
          />
        </IonList>
      )}
    </>
  );
}
