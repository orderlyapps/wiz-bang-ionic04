import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import { EditTalkHeader } from "@proclaimer-content/pages/home/speaker/schedule/edit-talk/edit-talk-header/EditTalkHeader";
import { EditTalkContent } from "@proclaimer-content/pages/home/speaker/schedule/edit-talk/edit-talk-content/EditTalkContent";

function EditTalkPage() {
  const { week_id } = useParams<{ week_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <EditTalkHeader
          title={getTheocraticWeekLabel(week_id)}
          back_href={`/home/speaker/schedule/${week_id}`}
        />
      </IonHeader>
      <IonContent className="content-wide">
        <EditTalkContent week_id={week_id} />
      </IonContent>
    </IonPage>
  );
}

export default EditTalkPage;
