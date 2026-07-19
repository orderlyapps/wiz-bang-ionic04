import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { ServiceYearReport } from "@proclaimer-content/pages/home/reports/reports-content/components/publisher-record-pdf/components/service-year-report/ServiceYearReport";
import type {
  PublisherRecordData,
  ServiceYearReportData,
} from "@proclaimer-content/pages/home/reports/reports-content/components/publisher-record-pdf/types";

const styles = StyleSheet.create({
  page: { padding: 18, fontSize: 8 },
});

export interface PublisherRecordEntry {
  publisher: PublisherRecordData;
  reports: ServiceYearReportData[];
}

export function PublisherRecordsPdf({ entries }: { entries: PublisherRecordEntry[] }) {
  return (
    <Document>
      {entries.map((entry, i) => (
        <Page key={i} size="A4" style={styles.page}>
          {entry.reports.map((report, j) => (
            <ServiceYearReport
              key={j}
              publisher={entry.publisher}
              report={report}
              last={j === entry.reports.length - 1}
            />
          ))}
        </Page>
      ))}
    </Document>
  );
}
