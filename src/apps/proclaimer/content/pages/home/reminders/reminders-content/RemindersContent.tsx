import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { format, startOfWeek } from "date-fns";

export function RemindersContent() {
  const current_week_id = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  return (
    <IonList>
      <NavItem label="CLAM" to={`/home/clam/${current_week_id}`} />
    </IonList>
  );
}
