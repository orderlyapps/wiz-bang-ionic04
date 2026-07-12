import { useState } from "react";
import { IonItem, IonList } from "@ionic/react";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { PublisherSelectModal } from "@proclaimer-content/pages/home/service-overseer/map-log/bulk-entry/bulk-entry-content/components/bulk-checkout/components/publisher-select-modal/PublisherSelectModal";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";

interface UnmatchedPublishersProps {
  unmatched_names: string[];
  publishers: Publisher[];
  resolutions: Record<string, string>;
  on_resolve: (name: string, publisher_id: string) => void;
}

export function UnmatchedPublishers({
  unmatched_names,
  publishers,
  resolutions,
  on_resolve,
}: UnmatchedPublishersProps) {
  const [active_name, set_active_name] = useState<string | null>(null);

  function handleSelect(publisher: Publisher) {
    if (active_name && publisher.id) {
      on_resolve(active_name, publisher.id);
    }
    set_active_name(null);
  }

  if (unmatched_names.length === 0) return null;

  return (
    <>
      <Body>These publisher names were not found. Assign each to an existing publisher:</Body>
      <Space size="sm" />
      <IonList inset>
        {unmatched_names.map((name) => (
          <IonItem key={name}>
            <ModalSelect
              label={name}
              display_value={
                resolutions[name]
                  ? getPublisherDisplayName(
                      publishers.find((p) => p.id === resolutions[name]) ?? publishers[0],
                    )
                  : ""
              }
              placeholder="Select a publisher..."
              on_open={() => set_active_name(name)}
            />
          </IonItem>
        ))}
      </IonList>
      <PublisherSelectModal
        isOpen={active_name !== null}
        onDismiss={() => set_active_name(null)}
        onSelect={handleSelect}
      />
    </>
  );
}
