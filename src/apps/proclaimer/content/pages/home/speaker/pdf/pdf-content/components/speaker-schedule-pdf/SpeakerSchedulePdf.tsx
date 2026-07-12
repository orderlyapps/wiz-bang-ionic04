import { Document, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format, parseISO } from "date-fns";
import { PdfPage } from "@util/vendor/react-pdf/PdfPage";
import type { SpeakerWeekData } from "../../hooks/useSpeakerScheduleData";

const styles = StyleSheet.create({
  header: {
    marginBottom: 5,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  table: {
    flexDirection: "column",
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    borderBottom: "1pt solid #333",
    paddingBottom: 2,
    marginBottom: -12,
  },
  leftHeader: {
    width: "60%",
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
  },
  outgoingHeader: {
    width: "40%",
    fontSize: 11,
    fontWeight: "bold",
    color: "#666",
    textAlign: "right",
  },
  weekLabelRow: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 2,
  },
  weekLabelCell: {
    width: "25%",
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
  },
  outlineCell: {
    width: "75%",
    fontSize: 13,
    color: "#666",
    fontWeight: "normal",
  },
  detailRow: {
    fontSize: 10,
    color: "#333",
    paddingBottom: 2,
  },
  columnsRow: {
    flexDirection: "row",
    borderBottom: "0.5pt solid #ddd",
    paddingBottom: 8,
  },
  leftColumn: {
    width: "60%",
  },
  outgoingCell: {
    width: "40%",
    fontSize: 10,
    color: "#333",
  },
  outgoingEntry: {
    marginBottom: 2,
    textAlign: "right",
    color: "#666",
  },
  monthDivider: {
    flexDirection: "row",
    paddingTop: 16,
  },
  monthDividerText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  noData: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 16,
  },
});

type SpeakerSchedulePdfProps = {
  readonly weeks: SpeakerWeekData[];
  readonly isLoading: boolean;
  readonly dateRange: {
    readonly firstMonday: string;
    readonly lastMonday: string;
  };
  readonly congregation_name?: string;
};

export function SpeakerSchedulePdf({
  weeks,
  isLoading,
  dateRange,
  congregation_name,
}: SpeakerSchedulePdfProps) {
  const firstMonth = format(new Date(dateRange.firstMonday), "MMMM");
  const lastMonth = format(new Date(dateRange.lastMonday), "MMMM yyyy");
  const rangeLabel = firstMonth === lastMonth ? firstMonth : `${firstMonth} – ${lastMonth}`;

  if (isLoading) {
    return (
      <Document>
        <PdfPage>
          <View style={styles.header}>
            <Text style={styles.title}>
              {congregation_name ? `${congregation_name} - ` : ""}Speaker Schedule for {rangeLabel}
            </Text>
          </View>
          <Text style={styles.noData}>Loading schedule data...</Text>
        </PdfPage>
      </Document>
    );
  }

  if (weeks.length === 0) {
    return (
      <Document>
        <PdfPage>
          <View style={styles.header}>
            <Text style={styles.title}>
              {congregation_name ? `${congregation_name} - ` : ""}Speaker Schedule for {rangeLabel}
            </Text>
          </View>
          <Text style={styles.noData}>No schedule data found for the selected period.</Text>
        </PdfPage>
      </Document>
    );
  }

  return (
    <Document>
      <PdfPage>
        <View style={styles.header}>
          <Text style={styles.title}>
            {congregation_name ? `${congregation_name} - ` : ""}Speaker Schedule for {rangeLabel}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.leftHeader}></Text>
            <Text style={styles.outgoingHeader}>Outgoing Speakers</Text>
          </View>
          {weeks.map((week, index) => {
            const weekDate = parseISO(week.week_id);
            const monthLabel = format(weekDate, "MMMM");
            const prevWeek = index > 0 ? weeks[index - 1] : null;
            const prevMonth = prevWeek ? format(parseISO(prevWeek.week_id), "MMMM") : null;
            const showDivider = index === 0 || monthLabel !== prevMonth;

            return (
              <View key={week.week_id}>
                {showDivider && (
                  <View style={styles.monthDivider}>
                    <Text style={styles.monthDividerText}>{monthLabel.toUpperCase()}</Text>
                  </View>
                )}
                <View style={styles.weekLabelRow}>
                  <Text style={styles.weekLabelCell}>{week.week_label}</Text>
                  {week.outline_theme && (
                    <Text style={styles.outlineCell}>{week.outline_theme}</Text>
                  )}
                </View>
                <View style={styles.columnsRow}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.detailRow}>
                      Speaker: {week.speaker_name ?? "—"}
                      {week.speaker_congregation_name ? ` (${week.speaker_congregation_name})` : ""}
                    </Text>
                    <Text style={styles.detailRow}>Chairman: {week.chairman_name ?? "—"}</Text>
                    <Text style={styles.detailRow}>Reader: {week.reader_name ?? "—"}</Text>
                  </View>
                  <Text style={styles.outgoingCell}>
                    {week.outgoing_speakers.length === 0
                      ? ""
                      : week.outgoing_speakers.map((os, i) => (
                          <Text key={i} style={styles.outgoingEntry}>
                            {os.speaker_name} - {os.target_congregation}
                            {os.outline_id ? ` (${os.outline_id})` : ""}
                            {i < week.outgoing_speakers.length - 1 ? "\n" : ""}
                          </Text>
                        ))}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </PdfPage>
    </Document>
  );
}
