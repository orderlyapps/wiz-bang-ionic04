import { IonList } from "@ionic/react";
import { format, startOfWeek } from "date-fns";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function AvOverseerContent() {
  const currentWeekId = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonList>
      <NavItem label="Participation" to="/home/av-overseer/participation" />
      <NavItem label="Participants" to="/home/av-overseer/participants" />
      <NavItem label="Schedule" to={`/home/av-overseer/schedule/${currentWeekId}`} />
      <NavItem label="PDF" to="/home/elder/audio-video" />
    </IonList>
  );
}
