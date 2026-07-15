import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Body } from "@ui/components/display/text/body/Body";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import { useAccordionState } from "@util/hooks/use-accordion-state/useAccordionState";
import { useInactivePublishers } from "./hooks/use-inactive-publishers/useInactivePublishers";
import { InactivePublisherItem } from "./components/inactive-publisher-item/InactivePublisherItem";

export function ToolsContent() {
  const { inactive_publishers, isLoading } = useInactivePublishers();
  const { value, onIonChange } = useAccordionState(
    localStorageKeys.secretaryToolsInactiveAccordion,
    "inactive",
  );

  if (isLoading) {
    return (
      <IonList>
        <IonItem lines="none" className="ion-text-center ion-padding">
          <IonLabel color="medium">Loading...</IonLabel>
        </IonItem>
      </IonList>
    );
  }

  return (
    <IonAccordionGroup value={value} onIonChange={onIonChange}>
      <IonAccordion value="inactive">
        <IonItem slot="header">
          <IonLabel>
            <Heading>Inactive Publishers</Heading>
          </IonLabel>
          {inactive_publishers.length > 0 && (
            <IonNote slot="end" color="medium">
              {inactive_publishers.length}
            </IonNote>
          )}
        </IonItem>
        <div slot="content">
          {inactive_publishers.length === 0 ? (
            <IonList>
              <IonItem lines="none" className="ion-padding">
                <IonLabel>
                  <Body color="medium">No inactive publishers in the last 6 months.</Body>
                </IonLabel>
              </IonItem>
            </IonList>
          ) : (
            <IonList>
              {inactive_publishers.map((publisher) => (
                <InactivePublisherItem key={publisher.id} publisher={publisher} />
              ))}
            </IonList>
          )}
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
}
