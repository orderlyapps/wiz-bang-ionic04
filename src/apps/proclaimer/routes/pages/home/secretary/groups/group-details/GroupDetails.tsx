import { IonPage, IonHeader } from "@ionic/react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { GroupDetailsHeader } from "@proclaimer-content/pages/home/secretary/groups/group-details/group-details-header/GroupDetailsHeader";
import { GroupDetailsContent } from "@proclaimer-content/pages/home/secretary/groups/group-details/group-details-content/GroupDetailsContent";

function GroupDetailsPage() {
  const { group_id } = useParams<{ group_id: string }>();
  const [is_add_modal_open, set_is_add_modal_open] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <GroupDetailsHeader group_id={group_id} on_add_click={() => set_is_add_modal_open(true)} />
      </IonHeader>
      <GroupDetailsContent
        group_id={group_id}
        is_add_modal_open={is_add_modal_open}
        on_dismiss={() => set_is_add_modal_open(false)}
      />
    </IonPage>
  );
}

export default GroupDetailsPage;
