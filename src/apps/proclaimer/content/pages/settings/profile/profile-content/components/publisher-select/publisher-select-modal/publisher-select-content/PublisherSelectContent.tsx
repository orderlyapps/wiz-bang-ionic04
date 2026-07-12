import { useState } from "react";
import { IonItem, IonLabel, IonList, IonIcon, IonSkeletonText } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { useLiveQuery } from "@tanstack/react-db";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { SearchInput } from "@ui/components/inputs/search/SearchInput";
import { Body } from "@ui/components/display/text/body/Body";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";
import {
  getStoredPublisher,
  setStoredPublisher,
  getPublisherDisplayName,
} from "@proclaimer-shared/publisher/publisherUtils";
import { getStoredCongregation } from "@util/app/congregation/utils";

interface PublisherSelectContentProps {
  onSelect?: () => void;
  onPublisherSelected?: (publisher: Publisher) => void;
  selectedPublisherId?: string;
}

export function PublisherSelectContent({
  onSelect,
  onPublisherSelected,
  selectedPublisherId,
}: PublisherSelectContentProps) {
  const congregation_id = getStoredCongregation()?.id;
  const [query, setQuery] = useState("");

  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  if (!congregation_id) {
    return (
      <Body color="medium" className="ion-text-center ion-padding">
        Please select a congregation first.
      </Body>
    );
  }

  const all_publishers = (data ?? []).filter((p) => p.congregation_id === congregation_id);
  const selected_id = selectedPublisherId ?? getStoredPublisher()?.id;

  const handleSelect = (publisher: Publisher) => {
    if (onPublisherSelected) {
      onPublisherSelected(publisher);
    } else {
      setStoredPublisher(publisher);
    }
    onSelect?.();
  };

  const hint =
    query.length === 0
      ? "Search for your name to get started."
      : query.length === 1
        ? "Keep typing…"
        : null;

  const filtered = hint
    ? []
    : all_publishers.filter((p) =>
        getPublisherDisplayName(p).toLowerCase().includes(query.toLowerCase()),
      );

  if (isLoading) {
    return (
      <>
        <SearchInput value={query} placeholder="Search publishers..." on_change={setQuery} />
        <IonList inset>
          {[1, 2, 3].map((i) => (
            <IonItem key={i}>
              <IonLabel>
                <IonSkeletonText style={{ width: "50%" }} />
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </>
    );
  }

  return (
    <>
      <SearchInput value={query} placeholder="Search publishers..." on_change={setQuery} />

      {hint ? (
        <Body color="medium" className="ion-text-center ion-padding">
          {hint}
        </Body>
      ) : filtered.length === 0 ? (
        <IonList inset>
          <IonItem>
            <IonLabel>No publishers found.</IonLabel>
          </IonItem>
        </IonList>
      ) : (
        <IonList className="ion-margin" inset>
          <MultiColumnList<Publisher>
            items={filtered}
            get_id={(p) => p.id ?? ""}
            gap="sm"
            render_item={(p) => {
              const is_selected = selected_id === p.id;
              return (
                <IonItem onClick={() => handleSelect(p)}>
                  <IonLabel className="ion-margin-start ion-padding-start">
                    {getPublisherDisplayName(p)}
                  </IonLabel>
                  {is_selected && <IonIcon icon={checkmark} slot="end" color="primary" />}
                </IonItem>
              );
            }}
          />
        </IonList>
      )}
    </>
  );
}
