import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import { ServiceYearReport } from "./components/service-year-report/ServiceYearReport";
import type { PublisherRecordData, ServiceYearReportData } from "./types";

const styles = StyleSheet.create({
  page: { padding: 18, fontSize: 8 },
});

interface PublisherRecordPdfProps {
  publisher: PublisherRecordData;
  reports: ServiceYearReportData[];
}

export function PublisherRecordPdf({ publisher, reports }: PublisherRecordPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {reports.map((report, i) => (
          <ServiceYearReport
            key={i}
            publisher={publisher}
            report={report}
            last={i === reports.length - 1}
          />
        ))}
      </Page>
    </Document>
  );
}
