import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function SchedulesContent() {
  return (
    <IonList>
      <NavItem label="Midweek Meeting" to="/schedules/midweek-meeting" />
      <NavItem label="Weekend Meeting" to="/schedules/weekend-meeting" />
      <NavItem label="Events" to="/schedules/events" />
      <NavItem label="Cleaning" to="/schedules/cleaning" />
    </IonList>
  );
}
