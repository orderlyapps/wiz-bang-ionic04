import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function PermissionsContent() {
  return (
    <IonList>
      <NavItem label="Cleaning" to="/home/congregation-admin/permissions/cleaning" />
      <NavItem label="Reports" to="/home/congregation-admin/permissions/reports" />
      <NavItem label="Secretary" to="/home/congregation-admin/permissions/secretary" />
      <NavItem label="Elder" to="/home/congregation-admin/permissions/elder" />
      <NavItem
        label="Ministerial Servant"
        to="/home/congregation-admin/permissions/ministerial-servant"
      />
      <NavItem label="CLAM Overseer" to="/home/congregation-admin/permissions/clam-overseer" />
      <NavItem
        label="Service Overseer"
        to="/home/congregation-admin/permissions/service-overseer"
      />
      <NavItem label="COBE" to="/home/congregation-admin/permissions/cobe" />
      <NavItem
        label="Territory Servant"
        to="/home/congregation-admin/permissions/territory-servant"
      />
      <NavItem label="AV Overseer" to="/home/congregation-admin/permissions/av-overseer" />
      <NavItem label="Speaker" to="/home/congregation-admin/permissions/speaker" />
      <NavItem label="Weekend" to="/home/congregation-admin/permissions/weekend" />
      <NavItem label="Reminders" to="/home/congregation-admin/permissions/reminders" />
      <NavItem label="Events" to="/home/congregation-admin/permissions/events" />
      <NavItem label="Watchtower" to="/home/congregation-admin/permissions/watchtower" />
    </IonList>
  );
}
