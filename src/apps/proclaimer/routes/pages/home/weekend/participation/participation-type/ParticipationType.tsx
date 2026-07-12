import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { ParticipationTypeHeader } from "@proclaimer-content/pages/home/weekend/participation/participation-type-header/ParticipationTypeHeader";
import { ParticipationTypeContent } from "@proclaimer-content/pages/home/weekend/participation/participation-type-content/ParticipationTypeContent";
import {
  weekendParticipationTypeLabels,
  weekendParticipationTypes,
  type WeekendParticipationType,
} from "@proclaimer-content/pages/home/weekend/participation/shared/constants/weekendParticipationTypeLabels";

function ParticipationTypePage() {
  const { participation_id } = useParams<{ participation_id: string }>();

  if (!weekendParticipationTypes.includes(participation_id as WeekendParticipationType)) {
    return null;
  }

  const label = weekendParticipationTypeLabels[participation_id as WeekendParticipationType];

  return (
    <IonPage>
      <IonHeader>
        <ParticipationTypeHeader participation_id={participation_id} label={label} />
      </IonHeader>
      <IonContent className="content-wide">
        <ParticipationTypeContent participation_id={participation_id} label={label} />
      </IonContent>
    </IonPage>
  );
}

export default ParticipationTypePage;
