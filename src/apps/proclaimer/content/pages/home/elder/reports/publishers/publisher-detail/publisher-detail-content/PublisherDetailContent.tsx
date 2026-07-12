import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { reportCollection } from "@shared/database/collections/report";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { IonList, IonItem, IonLabel, IonNote, IonItemDivider } from "@ionic/react";

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

  if (publisher_reports.length === 0) {
    return (
      <div className="ion-padding ion-text-center">
        <Body color="medium">No report records found.</Body>
      </div>
    );
  }

  const formatMonth = (date: string) =>
    new Date(date + "T00:00:00").toLocaleDateString(undefined, { month: "long" });

  const years = [...new Set(publisher_reports.map((r) => r.date.slice(0, 4)))].sort((a, b) =>
    b.localeCompare(a),
  );

  return (
    <IonList>
      {years.map((year) => (
        <div key={year}>
          <IonItemDivider sticky>
            <IonLabel>{year}</IonLabel>
          </IonItemDivider>
          {publisher_reports
            .filter((r) => r.date.slice(0, 4) === year)
            .map((report) => (
              <IonItem key={`${report.confidential_id}-${report.date}`} lines="full">
                <IonLabel>
                  <h3>{formatMonth(report.date)}</h3>
                  {report.hours && <p>Hours: {report.hours ?? "—"}</p>}
                  {report.bible_studies && <p>Bible Studies: {report.bible_studies ?? "—"}</p>}
                  {report.comments && <p>{report.comments}</p>}
                </IonLabel>
                <IonNote slot="end" color={report.active ? "success" : "medium"}>
                  {report.active ? "Active" : "Inactive"}
                </IonNote>
              </IonItem>
            ))}
        </div>
      ))}
    </IonList>
  );
}
