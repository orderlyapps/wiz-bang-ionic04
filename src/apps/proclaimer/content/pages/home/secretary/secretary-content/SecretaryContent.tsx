import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { ImportPublisherDataButton } from "./components/import-publisher-data-button/ImportPublisherDataButton";

export function SecretaryContent() {
  return (
    <>
      <IonList>
        <NavItem label="Publishers" to="/home/secretary/publishers" />
        <NavItem label="Groups" to="/home/secretary/groups" />
      </IonList>
      <ImportPublisherDataButton />
    </>
  );
}
