import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function SpeakerContent() {
  return (
    <IonList>
      <NavItem to="/home/speaker/schedule" label="Schedule" />
      <NavItem to="/home/speaker/local-speakers" label="Local Speakers" />
      <NavItem to="/home/speaker/visiting-speakers" label="Visiting Speakers" />
      <NavItem to="/home/speaker/pdf" label="PDF" />
    </IonList>
  );
}
