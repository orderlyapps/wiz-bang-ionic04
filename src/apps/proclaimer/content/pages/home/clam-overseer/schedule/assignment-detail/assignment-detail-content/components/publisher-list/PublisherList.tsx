import { IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import type { Publisher } from "@shared/database/schemas/publisher";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Space } from "@ui/components/layout/space/Space";
import type { PublisherSortOrder } from "../publisher-selector/hooks/use-publisher-sort/usePublisherSort";
import type { PublisherStats } from "../publisher-selector/hooks/use-publisher-stats/usePublisherStats";
import type { PublisherFilter } from "../publisher-selector/hooks/use-publisher-filter/usePublisherFilter";
import type { ParticipationType } from "../publisher-selector/utils/participationTypeMap";
import { buildAlphabeticalItems, isDivider } from "./utils/buildAlphabeticalItems";
import type { ListItem } from "./utils/buildAlphabeticalItems";
import { sortPublishers } from "./utils/sortPublishers";
import { getStatLabel } from "./utils/getStatLabel";
import { PublisherLetterDivider } from "./components/publisher-letter-divider/PublisherLetterDivider";
import { PublisherListItem } from "./components/publisher-list-item/PublisherListItem";

interface PublisherListProps {
  publishers: Publisher[];
  selected_id: string | undefined;
  on_select: (publisher_id: string) => void;
  sort_order: PublisherSortOrder;
  stats: Map<string, PublisherStats>;
  filter: PublisherFilter;
  participation_types: Map<string, Set<ParticipationType>>;
  publisher_ids_with_week_assignment?: Set<string>;
}

export function PublisherList({
  publishers,
  selected_id,
  on_select,
  sort_order,
  stats,
  filter,
  participation_types,
  publisher_ids_with_week_assignment,
}: PublisherListProps) {
  const filtered_publishers = publishers.filter((p) => {
    if (p.archived_at) return false;
    if (filter.gender !== "all" && p.gender !== filter.gender) return false;

    const publisher_stats = p.id ? stats.get(p.id) : undefined;
    const publisher_participation_types = p.id ? participation_types.get(p.id) : undefined;

    if (filter.participation_types.length > 0) {
      const has_any_type = filter.participation_types.some((type) =>
        publisher_participation_types?.has(type),
      );
      if (!has_any_type) return false;
    }

    if (filter.min_weeks_away_closest > 0) {
      const weeks_away_closest = publisher_stats?.weeks_away_closest;
      if (weeks_away_closest !== null && weeks_away_closest !== undefined) {
        if (weeks_away_closest < filter.min_weeks_away_closest) return false;
      }
    }

    if (filter.min_avg_weeks_between > 0) {
      const avg_weeks_between = publisher_stats?.avg_weeks_between;
      if (avg_weeks_between !== null && avg_weeks_between !== undefined) {
        if (avg_weeks_between < filter.min_avg_weeks_between) return false;
      }
    }

    return true;
  });

  if (filtered_publishers.length === 0) {
    return (
      <IonList className="ion-margin" inset>
        <IonItem>
          <IonLabel color="medium">No publishers found.</IonLabel>
        </IonItem>
      </IonList>
    );
  }

  const sorted = sortPublishers(filtered_publishers, sort_order, stats);

  const { items, pinned_ids } =
    sort_order === "alphabetical"
      ? buildAlphabeticalItems(sorted)
      : { items: sorted as ListItem[], pinned_ids: new Set<string>() };

  return (
    <>
      <IonList className="ion-margin" inset>
        <IonItem>
          <IonLabel>{filtered_publishers.length} publishers</IonLabel>
          <IonNote slot="end">{publishers.length} total</IonNote>
        </IonItem>
      </IonList>
      <MultiColumnList<ListItem>
        items={items}
        get_id={(item) => (isDivider(item) ? item.id : (item.id ?? ""))}
        pin_to_first_column={
          pinned_ids.size > 0
            ? (item) => pinned_ids.has(isDivider(item) ? item.id : (item.id ?? ""))
            : undefined
        }
        render_item={(item) => {
          if (isDivider(item)) {
            return <PublisherLetterDivider letter={item.letter} />;
          }
          return (
            <PublisherListItem
              publisher={item}
              selected={selected_id === item.id}
              stat_label={getStatLabel(item.id, sort_order, stats)}
              on_select={() => on_select(item.id ?? "")}
              has_week_assignment={publisher_ids_with_week_assignment?.has(item.id ?? "") ?? false}
            />
          );
        }}
      />
      <Space size="2xl" />
    </>
  );
}
