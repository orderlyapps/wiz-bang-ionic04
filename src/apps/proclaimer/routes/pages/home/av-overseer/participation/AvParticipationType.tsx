import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { AvParticipationTypeHeader } from "@proclaimer-content/pages/home/av-overseer/participation/av-participation-type-header/AvParticipationTypeHeader";
import { AvParticipationTypeContent } from "@proclaimer-content/pages/home/av-overseer/participation/av-participation-type-content/AvParticipationTypeContent";
import {
  avParticipationTypeLabels,
  avParticipationTypes,
  type AvParticipationType,
} from "@proclaimer-content/pages/home/av-overseer/participation/shared/constants/avParticipationTypeLabels";

function AvParticipationTypePage() {
  const { participation_id } = useParams<{ participation_id: string }>();

  if (!avParticipationTypes.includes(participation_id as AvParticipationType)) {
    return null;
  }

  const label = avParticipationTypeLabels[participation_id as AvParticipationType];

  return (
    <IonPage>
      <IonHeader>
        <AvParticipationTypeHeader participation_id={participation_id} label={label} />
      </IonHeader>
      <IonContent className="content-wide">
        <AvParticipationTypeContent participation_id={participation_id} label={label} />
      </IonContent>
    </IonPage>
  );
}

export default AvParticipationTypePage;
