import { IonAccordion, IonItem, IonLabel } from "@ionic/react";
import { Label } from "@ui/components/display/text/label/Label";
import { AddressRow } from "../address-row/AddressRow";
import type { StreetGroup as StreetGroupType } from "../../util/groupBySuburbAndStreet";

type Props = {
  street: StreetGroupType;
  onDelete: (id: string) => void;
};

export function StreetGroup({ street, onDelete }: Props) {
  return (
    <IonAccordion value={street.streetId}>
      <IonItem slot="header">
        <IonLabel>
          <Label>{street.streetName}</Label>
        </IonLabel>
      </IonItem>
      <div slot="content">
        {street.addresses.map((address) => (
          <AddressRow key={address.id} address={address} onDelete={onDelete} />
        ))}
      </div>
    </IonAccordion>
  );
}
