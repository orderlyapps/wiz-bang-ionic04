import { IonItem, IonLabel, IonNote } from "@ionic/react";
import type { ReturnVisit } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/layers/return-visit-source/types";

type ReturnVisitListItemProps = {
  return_visit: ReturnVisit;
  on_select: (rv: ReturnVisit) => void;
};

function getLastVisitDate(rv: ReturnVisit): string | null {
  if (!rv.visit_log || rv.visit_log.length === 0) return null;
  const sorted = [...rv.visit_log].sort((a, b) => b.visited_at.localeCompare(a.visited_at));
  return sorted[0].visited_at;
}

function formatRelativeDate(date_str: string): string {
  const date = new Date(date_str);
  const now = new Date();
  const diff_ms = now.getTime() - date.getTime();
  const diff_days = Math.floor(diff_ms / (1000 * 60 * 60 * 24));
  if (diff_days === 0) return "Today";
  if (diff_days === 1) return "Yesterday";
  if (diff_days < 7) return `${diff_days} days ago`;
  if (diff_days < 30) return `${Math.floor(diff_days / 7)} weeks ago`;
  if (diff_days < 365) return `${Math.floor(diff_days / 30)} months ago`;
  return `${Math.floor(diff_days / 365)} years ago`;
}

export function ReturnVisitListItem({ return_visit, on_select }: ReturnVisitListItemProps) {
  const name = `${return_visit.first_name} ${return_visit.last_name}`.trim();
  const address = `${return_visit.house_number}${return_visit.unit_number ? `/${return_visit.unit_number}` : ""} ${return_visit.street}`;
  const lastVisit = getLastVisitDate(return_visit);
  const lastVisitLabel = lastVisit ? formatRelativeDate(lastVisit) : "No visits yet";

  return (
    <IonItem button onClick={() => on_select(return_visit)} detail={false}>
      <IonLabel>
        <h2>{name || "Unknown"}</h2>
        <p>{address}</p>
      </IonLabel>
      <IonNote slot="end" color="medium">
        {lastVisitLabel}
      </IonNote>
    </IonItem>
  );
}
