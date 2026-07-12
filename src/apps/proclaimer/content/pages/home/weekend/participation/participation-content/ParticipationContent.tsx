import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import {
  weekendParticipationTypeLabels,
  weekendParticipationTypes,
} from "@proclaimer-content/pages/home/weekend/participation/shared/constants/weekendParticipationTypeLabels";

export function ParticipationContent() {
  return (
    <IonList>
      {weekendParticipationTypes.map((type) => (
        <NavItem
          key={type}
          label={weekendParticipationTypeLabels[type]}
          to={`/home/weekend/participation/${type}`}
        />
      ))}
    </IonList>
  );
}
