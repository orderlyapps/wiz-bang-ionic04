import { IonButton, IonItem, IonLabel } from "@ionic/react";
import { Icon } from "@ui/components/icons/Icon";
import type { AddressItem } from "../../util/groupBySuburbAndStreet";

type Props = {
  address: AddressItem;
  onDelete: (id: string) => void;
};

export function AddressRow({ address, onDelete }: Props) {
  const label = address.unit_number
    ? `${address.unit_number}/${address.house_number}`
    : address.house_number;

  return (
    <IonItem>
      <IonLabel>{label}</IonLabel>
      <IonButton fill="clear" slot="end" onClick={() => onDelete(address.id)}>
        <Icon name="delete" color="danger" />
      </IonButton>
    </IonItem>
  );
}
