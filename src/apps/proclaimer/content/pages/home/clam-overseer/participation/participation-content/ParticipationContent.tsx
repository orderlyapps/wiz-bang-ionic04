import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function ParticipationContent() {
  return (
    <IonList>
      <NavItem label="Chairman" to="/home/clam-overseer/participation/chairman" />
      <NavItem label="Prayer" to="/home/clam-overseer/participation/prayer" />
      <NavItem label="Treasures" to="/home/clam-overseer/participation/treasures" />
      <NavItem label="Gems" to="/home/clam-overseer/participation/gems" />
      <NavItem label="Bible Reading" to="/home/clam-overseer/participation/bible-reading" />
      <NavItem label="Apply" to="/home/clam-overseer/participation/apply" />
      <NavItem label="Talk" to="/home/clam-overseer/participation/talk" />
      <NavItem label="Assistant" to="/home/clam-overseer/participation/assistant" />
      <NavItem label="Counselor" to="/home/clam-overseer/participation/counselor" />
      <NavItem label="Living" to="/home/clam-overseer/participation/living" />
      <NavItem label="CBS Conductor" to="/home/clam-overseer/participation/cbs-conductor" />
      <NavItem label="CBS Reader" to="/home/clam-overseer/participation/cbs-reader" />
    </IonList>
  );
}
