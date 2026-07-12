import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function ReportsContent() {
  return (
    <IonList>
      <NavItem label="Stats" to="/home/elder/reports/stats" />
      <NavItem label="Publishers" to="/home/elder/reports/publishers" />
    </IonList>
  );
}
