import { Fragment } from "react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { publisherCollection } from "@shared/database/collections/publisher";
import { reportCollection } from "@shared/database/collections/report";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonItemDivider,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import { checkmarkCircleOutline } from "ionicons/icons";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Label } from "@ui/components/display/text/label/Label";
import { getServiceYear } from "@util/format/service-year";

const PIONEER_TYPES = ["regular_pioneer", "special_pioneer", "continuous_auxiliary"];

interface PublisherDetailContentProps {
  publisher_id: string;
}

export function PublisherDetailContent({ publisher_id }: PublisherDetailContentProps) {
  const { data: local_data } = useLiveQuery(
    (q) =>
      q.from({ pl: publisherLocalCollection }).where(({ pl }) => eq(pl.publisher_id, publisher_id)),
    [publisher_id],
  );

  const confidential_id = local_data?.[0]?.confidential_id;

  const { data: publisher_data } = useLiveQuery(
    (q) => q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisher_id)),
    [publisher_id],
  );

  const is_pioneer = PIONEER_TYPES.includes(publisher_data?.[0]?.type);

  const { data: reports, isLoading } = useLiveQuery(
    (q) => {
      if (!confidential_id) return undefined;
      return q
        .from({ r: reportCollection })
        .where(({ r }) => eq(r.confidential_id, confidential_id));
    },
    [confidential_id],
  );

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
    hours: number | null;
    bible_studies: number | null;
    comments: string | null;
    confidential_id: string;
  };

  const merged: ReportEntry[] = all_months.map((ym) => {
    const r = report_map.get(ym);
    if (r) return r as unknown as ReportEntry;
    return {
      date: `${ym}-01`,
      active: null,
      hours: null,
      bible_studies: null,
      comments: null,
      confidential_id: "",
    };
  });

  const getYearKey = (dateStr: string) =>
    is_pioneer ? getServiceYear(new Date(dateStr + "T00:00:00")) : dateStr.slice(0, 4);

  const years = [...new Set(merged.map((r) => getYearKey(r.date)))].sort((a, b) =>
    b.localeCompare(a),
  );

  return (
    <IonList>
      {years.map((year) => {
        const year_reports = merged.filter((r) => getYearKey(r.date) === year);
        const total_hours = year_reports.reduce((sum, r) => sum + (r.hours ?? 0), 0);
        return (
          <Fragment key={year}>
            <IonItemDivider sticky>
              <IonLabel>
                <Heading>{year}</Heading>
              </IonLabel>
              {is_pioneer && (
                <div slot="end">
                  <Body color="medium" bold>
                    {`TOTAL: `}
                  </Body>
                  <Body color="medium">{`${total_hours}`}</Body>
                </div>
              )}
            </IonItemDivider>
            {year_reports.map((report) => (
              <IonItem
                key={`${report.confidential_id || "placeholder"}-${report.date}`}
                lines="full"
              >
                <IonLabel>
                  <IonGrid className="ion-no-padding">
                    <IonRow>
                      <IonCol>
                        <Label>{formatMonth(report.date).toUpperCase()}</Label>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol className="ion-padding-start">
                        {report.hours && <Body>{`${report.hours ?? "—"} hours`}</Body>}
                      </IonCol>
                      <IonCol>
                        {report.bible_studies && (
                          <Body>{`${report.bible_studies ?? "—"} ${report.bible_studies > 1 ? "studies" : "study"}`}</Body>
                        )}
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol size="8" className="ion-padding-start">
                        {report.comments && (
                          <Body size="xs" color="medium">
                            {report.comments}
                          </Body>
                        )}
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonLabel>
                <IonIcon
                  slot="end"
                  icon={checkmarkCircleOutline}
                  color={report.active === null ? "medium" : report.active ? "success" : "danger"}
                />
              </IonItem>
            ))}
          </Fragment>
        );
      })}
    </IonList>
  );
}
