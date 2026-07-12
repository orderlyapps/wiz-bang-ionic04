import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function CongregationAdminContent() {
  return (
    <IonList>
      <NavItem label="Permissions" to="/home/congregation-admin/permissions" />
      <NavItem label="Auth Users" to="/home/congregation-admin/auth-users" />
    </IonList>
  );
}
