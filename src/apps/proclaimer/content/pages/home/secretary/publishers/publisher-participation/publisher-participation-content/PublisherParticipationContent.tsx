import { IonContent } from "@ionic/react";

export function PublisherParticipationContent({ publisher_id }: { publisher_id: string }) {
  return (
    <IonContent className="content-full">
      <div className="ion-padding ion-text-center">
        <p>{publisher_id}</p>
      </div>
    </IonContent>
  );
}
