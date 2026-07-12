import { Document, Text, StyleSheet } from "@react-pdf/renderer";
import { PdfPage } from "@util/vendor/react-pdf/PdfPage";
import { SchedulePdfHeader } from "../schedule-pdf-header/SchedulePdfHeader";
import { WeekSection } from "../week-section/WeekSection";
import type { WeekScheduleData } from "../../hooks/useMidweekScheduleData";

const styles = StyleSheet.create({
  noData: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 14,
  },
});

type MidweekSchedulePdfDocumentProps = {
  readonly weeks: WeekScheduleData[];
  readonly isLoading: boolean;
  readonly monthDate: string;
  readonly highlightPublisherId?: string;
};

export function MidweekSchedulePdfDocument({
  weeks,
  isLoading,
  monthDate,
  highlightPublisherId,
}: MidweekSchedulePdfDocumentProps) {
  if (isLoading) {
    return (
      <Document>
        <PdfPage>
          <SchedulePdfHeader scheduleName="Midweek Meeting" monthDate={monthDate} />
          <Text style={styles.noData}>Loading schedule data...</Text>
        </PdfPage>
      </Document>
    );
  }

  if (weeks.length === 0) {
    return (
      <Document>
        <PdfPage>
          <SchedulePdfHeader scheduleName="Midweek Meeting" monthDate={monthDate} />
          <Text style={styles.noData}>No meeting data found for the selected month.</Text>
        </PdfPage>
      </Document>
    );
  }

  return (
    <Document>
      <PdfPage>
        <SchedulePdfHeader scheduleName="Midweek Meeting" monthDate={monthDate} />
        {weeks.map((week) => (
          <WeekSection key={week.weekId} week={week} highlightPublisherId={highlightPublisherId} />
        ))}
      </PdfPage>
    </Document>
  );
}
