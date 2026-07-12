import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function MinistryContent() {
  return (
    <IonList>
      <NavItem label="Map" to="/ministry/door-to-door" />
      <NavItem label="Letter Writing" to="/ministry/letter-writing" />
      {/* <NavItem label="Maps" to="/ministry/maps" /> */}
      <NavItem label="Schedule" to="/ministry/schedule" />
    </IonList>
  );
}
