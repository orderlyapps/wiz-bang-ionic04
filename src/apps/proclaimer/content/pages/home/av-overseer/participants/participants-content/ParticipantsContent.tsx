import { IonItem, IonLabel, IonList, IonSkeletonText } from "@ionic/react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Body } from "@ui/components/display/text/body/Body";
import { avParticipationTypeLabels } from "@proclaimer-content/pages/home/av-overseer/participation/shared/constants/avParticipationTypeLabels";
import { useAvParticipants } from "@proclaimer-content/pages/home/av-overseer/participants/shared/hooks/useAvParticipants/useAvParticipants";

export function ParticipantsContent() {
  const { participants, isLoading } = useAvParticipants();

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

  if (participants.length === 0) {
    return (
      <IonList inset>
        <IonItem>
          <IonLabel>
            <Body color="medium">No participants found.</Body>
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }

  return (
    <IonList className="ion-margin" inset>
      <MultiColumnList
        items={participants}
        get_id={(p) => p.participant_id}
        gap="sm"
        render_item={(p) => (
          <IonItem>
            <IonLabel className="ion-margin-start ion-padding-start">
              <h3>{p.display_name}</h3>
              <p>
                {p.participations
                  .map(
                    (ap) =>
                      avParticipationTypeLabels[
                        ap.participation_id as keyof typeof avParticipationTypeLabels
                      ] ?? ap.participation_id,
                  )
                  .join(", ")}
              </p>
            </IonLabel>
          </IonItem>
        )}
      />
    </IonList>
  );
}
