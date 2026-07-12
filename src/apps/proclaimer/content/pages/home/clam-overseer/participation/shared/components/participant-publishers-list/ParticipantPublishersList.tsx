import { IonItem, IonLabel, IonList, IonSkeletonText } from "@ionic/react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Body } from "@ui/components/display/text/body/Body";
import { useParticipantPublishers } from "@proclaimer-content/pages/home/clam-overseer/participation/shared/hooks/useParticipantPublishers";
import type { MidweekParticipation } from "@shared/database/schemas/midweek-participation";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";

interface ParticipantPublishersListProps {
  participation_id: MidweekParticipation["participation_id"];
}

export function ParticipantPublishersList({ participation_id }: ParticipantPublishersListProps) {
  const { participantPublishers, isLoading, removeParticipant } =
    useParticipantPublishers(participation_id);

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
