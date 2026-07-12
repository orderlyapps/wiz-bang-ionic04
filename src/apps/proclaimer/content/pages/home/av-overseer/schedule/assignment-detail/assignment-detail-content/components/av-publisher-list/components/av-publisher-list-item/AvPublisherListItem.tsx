import { IonItem, IonLabel, IonChip } from "@ionic/react";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { Body } from "@ui/components/display/text/body/Body";

interface AvPublisherListItemProps {
  publisher: Publisher;
  selected: boolean;
  stat_label: string | undefined;
  on_select: () => void;
  has_week_assignment: boolean;
}

export function AvPublisherListItem({
  publisher,
  selected,
  stat_label,
  on_select,
  has_week_assignment,
}: AvPublisherListItemProps) {
  return (
    <IonItem color={selected ? "primary" : undefined} onClick={on_select}>
      <IonLabel>
        <Body color={has_week_assignment && !selected ? "warning" : undefined}>
          {getPublisherDisplayName(publisher)}
        </Body>
      </IonLabel>
      {stat_label && !selected && (
        <IonChip color={selected ? "primary" : "medium"}>{stat_label}</IonChip>
      )}
      {stat_label && selected && <Body className="ion-padding-end">{stat_label}</Body>}
    </IonItem>
  );
}
