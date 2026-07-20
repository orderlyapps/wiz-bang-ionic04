import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { ImportPublisherDataButton } from "./components/import-publisher-data-button/ImportPublisherDataButton";
import { Space } from "@ui/components/layout/space/Space";

export function SecretaryContent() {
  return (
    <>
      <IonList>
        <NavItem label="Publishers" to="/home/secretary/publishers" />
        <NavItem label="Publisher Records" to="/home/secretary/publisher-records" />
        <NavItem label="Groups" to="/home/secretary/groups" />
        <NavItem label="Tools" to="/home/secretary/tools" />
        <NavItem label="Branch Report" to="/home/secretary/branch-report" />
      </IonList>
      <Space />
      <ImportPublisherDataButton />
    </>
  );
}
