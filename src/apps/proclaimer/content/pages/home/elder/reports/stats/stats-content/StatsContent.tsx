import { useLiveQuery, eq } from "@tanstack/react-db";
import { reportCollection } from "@shared/database/collections/report";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { StatItem } from "./components/stat-item/StatItem";
import { useIsCongregationAdmin } from "./hooks/useIsCongregationAdmin";

export function StatsContent() {
  const { is_congregation_admin, isLoading: is_admin_loading } = useIsCongregationAdmin();
  const congregation_id = getStoredCongregation()?.id;

  const { data, isLoading } = useLiveQuery(
    (q) =>
      q
        .from({ r: reportCollection })
        .where(({ r }) => eq(r.congregation_id, congregation_id ?? "")),
    [congregation_id],
  );

  if (is_admin_loading) {
    return <Spinner />;
  }

  if (!is_congregation_admin) {
    return (
      <div className="ion-padding ion-text-center">
        <Body color="medium">Comming soon...</Body>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  const reports = data ?? [];
  const active_reports = reports.filter((r) => r.active);
  const total_hours = active_reports.reduce((sum, r) => sum + (r.hours ?? 0), 0);
  const total_bible_studies = active_reports.reduce((sum, r) => sum + (r.bible_studies ?? 0), 0);
  const unique_publishers = new Set(reports.map((r) => r.confidential_id)).size;
  const avg_hours = active_reports.length > 0 ? total_hours / active_reports.length : 0;

  return (
    <>
      <StatItem label="Total Reports" value={reports.length} />
      <StatItem label="Active Reports" value={active_reports.length} />
      <StatItem label="Unique Publishers" value={unique_publishers} />
      <StatItem label="Total Hours" value={total_hours} />
      <StatItem label="Total Bible Studies" value={total_bible_studies} />
      <StatItem label="Avg Hours / Active Report" value={avg_hours.toFixed(1)} />
    </>
  );
}
