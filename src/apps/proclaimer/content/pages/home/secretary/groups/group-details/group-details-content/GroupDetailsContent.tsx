import { IonContent } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { groupCollection } from "@shared/database/collections/group";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { isListablePublisher } from "./groupPublisherUtils";
import { GroupForm } from "./components/GroupForm";
import { GroupPublishersList } from "./components/GroupPublishersList";
import { AddPublishersModal } from "./components/AddPublishersModal";

interface GroupDetailsContentProps {
  group_id: string;
  is_add_modal_open: boolean;
  on_dismiss: () => void;
}

export function GroupDetailsContent({
  group_id,
  is_add_modal_open,
  on_dismiss,
}: GroupDetailsContentProps) {
  const congregation_id = getStoredCongregation()?.id;

  const { data: group_data, isLoading: is_group_loading } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).where(({ g }) => eq(g.id, group_id)),
  );

  const { data: publishers_data, isLoading: is_publishers_loading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).where(({ p }) => eq(p.group_id, group_id)),
  );

  const { data: all_publishers_data } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const publishers = (
    (publishers_data ?? []).filter((p) => isListablePublisher(p as Publisher, true)) as Publisher[]
  ).sort((a, b) => {
    const last = a.last_name.localeCompare(b.last_name);
    if (last !== 0) return last;
    const a_first = a.display_name ?? a.first_name;
    const b_first = b.display_name ?? b.first_name;
    return a_first.localeCompare(b_first);
  });

  const all_publishers = (all_publishers_data ?? []).filter(
    (p) =>
      p.congregation_id === congregation_id &&
      p.group_id !== group_id &&
      isListablePublisher(p as Publisher, true),
  ) as Publisher[];

  const group = group_data?.[0];

  if (is_group_loading || is_publishers_loading) {
    return (
      <IonContent>
        <Spinner />
      </IonContent>
    );
  }

  if (!group) {
    return (
      <IonContent>
        <div className="ion-padding ion-text-center">
          <Body color="medium">Group not found.</Body>
        </div>
      </IonContent>
    );
  }

  return (
    <IonContent className="content-wide">
      <GroupForm
        group_id={group_id}
        name={group.name}
        overseer_id={group.overseer_id}
        assistant_id={group.assistant_id}
        publishers={publishers}
      />

      <GroupPublishersList publishers={publishers} />

      <AddPublishersModal
        is_open={is_add_modal_open}
        group_id={group_id}
        publishers={all_publishers}
        on_dismiss={on_dismiss}
      />
    </IonContent>
  );
}
