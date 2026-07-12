import { useState } from "react";
import { IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { useLetterWritingAddresses } from "../../hooks/use-letter-writing-addresses/useLetterWritingAddresses";
import { groupBySuburbAndStreet } from "../../util/groupBySuburbAndStreet";
import { SuburbGroup } from "../suburb-group/SuburbGroup";
import { DeleteAddressAlert } from "../delete-address-alert/DeleteAddressAlert";

export function LetterWritingList() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { addresses, suburbs, streets, isLoading } = useLetterWritingAddresses();

  if (isLoading) {
    return <Spinner />;
  }

  if (!addresses.length) {
    return (
      <IonList>
        <IonItem lines="none">
          <IonLabel>
            <Body>No letter writing addresses</Body>
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }

  const groups = groupBySuburbAndStreet(addresses, suburbs, streets);

  return (
    <>
      <IonAccordionGroup multiple>
        {groups.map((suburb) => (
          <SuburbGroup key={suburb.suburbId} suburb={suburb} onDelete={setDeleteId} />
        ))}
      </IonAccordionGroup>
      <DeleteAddressAlert deleteId={deleteId} onDismiss={() => setDeleteId(null)} />
    </>
  );
}
