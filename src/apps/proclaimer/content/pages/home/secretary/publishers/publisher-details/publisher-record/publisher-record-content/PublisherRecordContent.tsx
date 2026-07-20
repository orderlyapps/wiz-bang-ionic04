import { Fragment, useState } from "react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { IonList, IonLabel, IonItemDivider } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { getServiceYear } from "@util/format/service-year";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Report } from "@shared/database/schemas/report";
import { PublisherReportModal } from "@proclaimer-content/pages/home/reports/reports-content/components/publisher-report-modal/PublisherReportModal";
import { usePublisherReports } from "@proclaimer-content/pages/home/reports/reports-content/hooks/usePublisherReports";
import { ReportItem } from "@proclaimer-content/pages/home/reports/reports-content/components/report-item/ReportItem";
import { Space } from "@ui/components/layout/space/Space";

const PIONEER_TYPES = ["regular_pioneer"];

interface PublisherRecordContentProps {
  publisher_id: string;
}

export function PublisherRecordContent({ publisher_id }: PublisherRecordContentProps) {
  const { has_secretary } = usePermissions();
  const [selected_date, set_selected_date] = useState<string | null>(null);
  const { confidential_id, reports, isLoading } = usePublisherReports(publisher_id);

  const { data: publisher_data } = useLiveQuery(
    (q) => q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisher_id)),
    [publisher_id],
  );

  const is_pioneer = PIONEER_TYPES.includes(publisher_data?.[0]?.type);

  if (isLoading) {
    return <Spinner />;
  }

  const publisher_reports = (reports ?? []).sort((a, b) => b.date.localeCompare(a.date));

  const formatMonth = (date: string) =>
    new Date(date + "T00:00:00").toLocaleDateString(undefined, { month: "long" });

  const now = new Date();
  const all_months: string[] = [];
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    all_months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }

  const report_map = new Map<string, (typeof publisher_reports)[number]>();
  for (const r of publisher_reports) {
    report_map.set(r.date.slice(0, 7), r);
  }

  type ReportEntry = {
    date: string;
    active: boolean | null;
    aux_pio: boolean | null;
    hours: number | null;
    bible_studies: number | null;
    credit_hours: Partial<Record<"ldc" | "bethel" | "hlc" | "school", number>> | null;
    comments: string | null;
    confidential_id: string;
  };

  const merged: ReportEntry[] = all_months.map((ym) => {
    const r = report_map.get(ym);
    if (r) return r as unknown as ReportEntry;
    return {
      date: `${ym}-01`,
      active: null,
      aux_pio: null,
      hours: null,
      bible_studies: null,
      credit_hours: null,
      comments: null,
      confidential_id: "",
    };
  });

  const getYearKey = (dateStr: string) =>
    is_pioneer ? getServiceYear(new Date(dateStr + "T00:00:00")) : dateStr.slice(0, 4);

  const years = [...new Set(merged.map((r) => getYearKey(r.date)))].sort((a, b) =>
    b.localeCompare(a),
  );

  const getCreditedHours = (r: ReportEntry): number => {
    if (r.hours == null) return 0;
    if (r.hours >= 55) return r.hours;
    const credit_total = Object.values(r.credit_hours ?? {}).reduce((sum, h) => sum + (h ?? 0), 0);
    return Math.min(55, r.hours + credit_total);
  };

  const publisher = publisher_data?.[0];
  const publisher_name = publisher ? getPublisherDisplayName(publisher, "last_first") : "";
  const group_id = publisher?.group_id ?? null;

  const selected_report = selected_date
    ? publisher_reports.find((r) => r.date === selected_date)
    : undefined;

  return (
    <>
      <IonList>
        {years.map((year) => {
          const year_reports = merged.filter((r) => getYearKey(r.date) === year);
          const total_hours = year_reports.reduce((sum, r) => sum + (r.hours ?? 0), 0);
          const total_credited_hours = year_reports.reduce(
            (sum, r) => sum + getCreditedHours(r),
            0,
          );
          return (
            <Fragment key={year}>
              <IonItemDivider sticky className="ion-padding">
                <IonLabel>
                  <Heading>{year}</Heading>
                </IonLabel>
                {is_pioneer && (
                  <div slot="end">
                    <Body color="medium" bold>
                      {`TOTAL: `}
                    </Body>
                    <Body color="medium">{`${total_hours} ${total_hours === total_credited_hours ? "" : `(${total_credited_hours})`}`}</Body>
                  </div>
                )}
              </IonItemDivider>
              {year_reports.map((report) => (
                <ReportItem
                  key={`${report.confidential_id || "placeholder"}-${report.date}`}
                  label={formatMonth(report.date).toUpperCase()}
                  active={report.active}
                  aux_pio={report.aux_pio}
                  hours={report.hours}
                  bible_studies={report.bible_studies}
                  credit_hours={report.credit_hours}
                  comments={report.comments}
                  button={has_secretary}
                  detail={has_secretary}
                  onClick={has_secretary ? () => set_selected_date(report.date) : undefined}
                />
              ))}
              <Space size="xl" />
            </Fragment>
          );
        })}
      </IonList>
      {selected_date && confidential_id && (
        <PublisherReportModal
          is_open={!!selected_date}
          on_dismiss={() => set_selected_date(null)}
          publisher_name={publisher_name}
          confidential_id={confidential_id}
          group_id={group_id}
          date={selected_date}
          existing_report={selected_report as Report | undefined}
        />
      )}
    </>
  );
}
