import { IonList } from "@ionic/react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";

interface AvAssignedPublisherProps {
  label: string;
  assignee: Publisher | undefined;
  on_delete: () => void;
}

export function AvAssignedPublisher({ label, assignee, on_delete }: AvAssignedPublisherProps) {
  if (!assignee) return null;

  return (
    <IonList>
      <LabelValueItem
        label={label}
        value={getPublisherDisplayName(assignee)}
        end_detail={
          <DeleteIconButton
            alert_header="Remove Assignment"
            alert_message="Remove this publisher from the assignment?"
            confirm_text="Remove"
            on_click={on_delete}
          />
        }
      />
    </IonList>
  );
}
