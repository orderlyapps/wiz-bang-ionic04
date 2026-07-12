import { IonItem, IonLabel, IonList, IonSkeletonText } from "@ionic/react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Body } from "@ui/components/display/text/body/Body";
import { useAvParticipantPublishers } from "@proclaimer-content/pages/home/av-overseer/participation/shared/hooks/useAvParticipantPublishers";
import type { AvParticipation } from "@shared/database/schemas/av-participation";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";

interface AvParticipantPublishersListProps {
  participation_id: AvParticipation["participation_id"];
}

export function AvParticipantPublishersList({
  participation_id,
}: AvParticipantPublishersListProps) {
  const { participantPublishers, isLoading, removeParticipant } =
    useAvParticipantPublishers(participation_id);

  if (isLoading) {
    return (
      <IonList inset>
        {[1, 2, 3].map((i) => (
          <IonItem key={i}>
            <IonLabel>
              <IonSkeletonText style={{ width: "50%" }} />
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    );
  }

  if (participantPublishers.length === 0) {
    return (
      <IonList inset>
        <IonItem>
          <IonLabel>
            <Body color="medium">No participants assigned.</Body>
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }

  return (
    <IonList className="ion-margin" inset>
      <MultiColumnList
        items={participantPublishers}
        get_id={(pp) => pp.participant_id}
        gap="sm"
        render_item={(pp) => (
          <IonItem>
            <IonLabel className="ion-margin-start ion-padding-start">{pp.display_name}</IonLabel>
            <DeleteIconButton
              slot="end"
              alert_header="Remove Participant"
              alert_message={`Remove ${pp.display_name} from this assignment?`}
              confirm_text="Remove"
              on_click={() => removeParticipant(pp.participant_id)}
            />
          </IonItem>
        )}
      />
    </IonList>
  );
}
