import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { StreetGroup } from "../street-group/StreetGroup";
import type { SuburbGroup as SuburbGroupType } from "../../util/groupBySuburbAndStreet";

type Props = {
  suburb: SuburbGroupType;
  onDelete: (id: string) => void;
};

export function SuburbGroup({ suburb, onDelete }: Props) {
  return (
    <IonAccordion value={suburb.suburbId}>
      <IonItem slot="header">
        <IonLabel className="ion-margin-vertical">
          <Heading size="lg">{suburb.suburbName}</Heading>
        </IonLabel>
      </IonItem>
      <div slot="content">
        <IonAccordionGroup multiple>
          {suburb.streets.map((street) => (
            <StreetGroup key={street.streetId} street={street} onDelete={onDelete} />
          ))}
        </IonAccordionGroup>
      </div>
    </IonAccordion>
  );
}
