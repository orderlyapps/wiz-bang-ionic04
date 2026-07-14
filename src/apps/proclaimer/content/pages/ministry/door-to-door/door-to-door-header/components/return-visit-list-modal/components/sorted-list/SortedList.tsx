import { IonItem, IonListHeader } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { ReturnVisitListItem } from "../return-visit-list-item/ReturnVisitListItem";
import type { SortMode } from "../sort-control/SortControl";
import type { ReturnVisit } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/layers/return-visit-source/types";

type SortedListProps = {
  items: ReturnVisit[];
  sort_mode: SortMode;
  on_select: (rv: ReturnVisit) => void;
};

function getLastVisitDate(rv: ReturnVisit): number {
  if (!rv.visit_log || rv.visit_log.length === 0) return 0;
  const sorted = [...rv.visit_log].sort((a, b) => b.visited_at.localeCompare(a.visited_at));
  return new Date(sorted[0].visited_at).getTime();
}

export function SortedList({ items, sort_mode, on_select }: SortedListProps) {
  if (sort_mode === "suburb") {
    const grouped = items.reduce<Record<string, ReturnVisit[]>>((acc, rv) => {
      const key = rv.suburb || "Unknown";
      if (!acc[key]) acc[key] = [];
      acc[key].push(rv);
      return acc;
    }, {});

    const sortedSuburbs = Object.keys(grouped).sort();

    return (
      <>
        {sortedSuburbs.map((suburb) => (
          <div key={suburb}>
            <IonListHeader>
              <IonItem lines="none">
                <Heading size="md">{suburb}</Heading>
              </IonItem>
            </IonListHeader>
            {grouped[suburb]
              .sort((a, b) => a.first_name.localeCompare(b.first_name))
              .map((rv) => (
                <ReturnVisitListItem key={rv.id} return_visit={rv} on_select={on_select} />
              ))}
          </div>
        ))}
      </>
    );
  }

  const sorted = [...items].sort((a, b) => {
    if (sort_mode === "recent") {
      return getLastVisitDate(a) - getLastVisitDate(b);
    }
    return a.first_name.localeCompare(b.first_name);
  });

  return (
    <>
      {sorted.map((rv) => (
        <ReturnVisitListItem key={rv.id} return_visit={rv} on_select={on_select} />
      ))}
    </>
  );
}
