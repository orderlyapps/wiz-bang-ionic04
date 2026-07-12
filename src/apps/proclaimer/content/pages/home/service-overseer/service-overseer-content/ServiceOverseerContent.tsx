import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function ServiceOverseerContent() {
  return (
    <IonList>
      <NavItem label="Map" to="/home/service-overseer/map" />
      <NavItem label="Records" to="/home/service-overseer/map-log" />
      <NavItem label="Tags" to="/home/service-overseer/map-tags" />
      <NavItem label="PDFs" to="/home/service-overseer/pdfs" />
      {/* <NavItem label="Auto Checkout" to="/home/service-overseer/map-checkout" /> */}
    </IonList>
  );
}
