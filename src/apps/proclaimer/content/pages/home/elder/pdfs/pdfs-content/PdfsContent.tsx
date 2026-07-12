import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function PdfsContent() {
  return (
    <IonList>
      <NavItem label="Contacts List" to="/home/elder/contacts-list" />
      <NavItem label="Groups" to="/home/elder/pdfs/groups" />
      <NavItem label="Midweek Meeting" to="/home/elder/clam" />
      <NavItem label="Weekend Meeting" to="/home/elder/pdfs/speaker-schedule" />
      <NavItem label="Audio Video" to="/home/elder/audio-video" />
      <NavItem label="Cleaning" to="/home/elder/cleaning-schedule" />
    </IonList>
  );
}
