import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function WeekendContent() {
  return (
    <IonList>
      <NavItem to="/home/weekend/schedule" label="Schedule" />
      <NavItem to="/home/weekend/participation" label="Participation" />
    </IonList>
  );
}
