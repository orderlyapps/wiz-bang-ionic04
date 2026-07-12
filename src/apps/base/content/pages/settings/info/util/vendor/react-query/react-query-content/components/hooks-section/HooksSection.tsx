import { IonAccordion, IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";

export function HooksSection() {
  return (
    <IonAccordion value="hooks">
      <IonItem slot="header">
        <IonLabel>Available Hooks</IonLabel>
      </IonItem>
      <div className="ion-padding" slot="content">
        <Body>
          <strong>useQuery</strong> — Fetch and cache server data
        </Body>
        <Body>
          <strong>useQueries</strong> — Fetch multiple queries in parallel
        </Body>
        <Body>
          <strong>useMutation</strong> — Create, update, delete server data
        </Body>
        <Body>
          <strong>useInfiniteQuery</strong> — Paginated/infinite scroll data
        </Body>
        <Body>
          <strong>useIsFetching</strong> — Check if any queries are loading
        </Body>
        <Body>
          <strong>useIsMutating</strong> — Check if any mutations are running
        </Body>
      </div>
    </IonAccordion>
  );
}
