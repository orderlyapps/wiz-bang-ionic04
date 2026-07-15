import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function ElderContent() {
  return (
    <IonList>
      <NavItem label="Reports" to="/home/elder/reports" />
      <NavItem label="Stats" to="/home/elder/stats" />
      <NavItem label="PDFs" to="/home/elder/pdfs" />
    </IonList>
  );
}
