import { IonItem, IonLabel, IonList } from "@ionic/react";
import { useCircuitVisitEvent } from "@proclaimer-content/pages/home/clam-overseer/schedule/schedule-content/helper/use-circuit-visit-event";

interface CircuitVisitBannerProps {
  week_id: string;
}

export function CircuitVisitBanner({ week_id }: CircuitVisitBannerProps) {
  const { event } = useCircuitVisitEvent(week_id);

  if (!event) return null;

  return (
    <IonList inset>
      <IonItem color="primary" className="ion-text-center">
        <IonLabel>Circuit Overseer Visit</IonLabel>
      </IonItem>
    </IonList>
  );
}
