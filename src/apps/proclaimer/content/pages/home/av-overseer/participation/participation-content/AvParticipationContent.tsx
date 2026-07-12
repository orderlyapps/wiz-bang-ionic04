import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import {
  avParticipationTypeLabels,
  avParticipationTypes,
} from "@proclaimer-content/pages/home/av-overseer/participation/shared/constants/avParticipationTypeLabels";

export function AvParticipationContent() {
  return (
    <IonList>
      {avParticipationTypes.map((type) => (
        <NavItem
          key={type}
          label={avParticipationTypeLabels[type]}
          to={`/home/av-overseer/participation/${type}`}
        />
      ))}
    </IonList>
  );
}
