import { IonList } from "@ionic/react";
import { format, startOfWeek } from "date-fns";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function ClamOverseerContent() {
  const currentWeekId = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonList>
      <NavItem label="Participation" to="/home/clam-overseer/participation" />
      <NavItem label="Schedule" to={`/home/clam-overseer/schedule/${currentWeekId}`} />
      <NavItem label="PDF" to="/home/elder/clam" />
    </IonList>
  );
}
