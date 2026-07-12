import { Document, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format, parseISO } from "date-fns";
import { PdfPage } from "@util/vendor/react-pdf/PdfPage";
import { CleaningInstructions } from "./CleaningInstructions";
import type { CleaningWeekData } from "../../hooks/useCleaningScheduleData";

const styles = StyleSheet.create({
  header: {
    marginBottom: 5,
    paddingBottom: 8,
    // borderBottom: "1pt solid #333",
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
    marginBottom: -20,
    fontWeight: "bold",
  },
  weekHeader: {
    width: "45%",
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  groupHeader: {
    width: "27.5%",
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    borderBottom: "0.5pt solid #ddd",
    paddingBottom: 10,
    paddingTop: 10,
  },
  weekCell: {
    width: "45%",
    fontSize: 12,
    color: "#333",
  },
  groupCell: {
    width: "27.5%",
    fontSize: 12,
    color: "#333",
  },
  monthDivider: {
    flexDirection: "row",
    paddingTop: 30,
    // paddingBottom: 0,
  },
  monthDividerText: {
    fontSize: 14,
    fontWeight: "bold",
    // color: "#666",
  },
  noData: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 16,
  },
});

type CleaningSchedulePdfDocumentProps = {
  readonly weeks: CleaningWeekData[];
  readonly isLoading: boolean;
  readonly dateRange: {
    readonly firstMonday: string;
    readonly lastMonday: string;
  };
};

export function CleaningSchedulePdfDocument({
  weeks,
  isLoading,
  dateRange,
}: CleaningSchedulePdfDocumentProps) {
  const firstMonth = format(new Date(dateRange.firstMonday), "MMMM");
  const lastMonth = format(new Date(dateRange.lastMonday), "MMMM yyyy");
  const rangeLabel = firstMonth === lastMonth ? firstMonth : `${firstMonth} – ${lastMonth}`;

  if (isLoading) {
    return (
      <Document>
        <PdfPage>
          <View style={styles.header}>
            <Text style={styles.title}>Cleaning Schedule for {rangeLabel}</Text>
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
            <Text style={styles.title}>Cleaning Schedule for {rangeLabel}</Text>
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
          <Text style={styles.title}>Cleaning Schedule for {rangeLabel}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.weekHeader}></Text>
            <Text style={styles.groupHeader}>Thorough</Text>
            <Text style={styles.groupHeader}>Light</Text>
          </View>
          {weeks.map((week, index) => {
            const weekDate = parseISO(week.weekId);
            const monthLabel = format(weekDate, "MMMM");
            const prevWeek = index > 0 ? weeks[index - 1] : null;
            const prevMonth = prevWeek ? format(parseISO(prevWeek.weekId), "MMMM") : null;
            const showDivider = index === 0 || monthLabel !== prevMonth;

            return (
              <View key={week.weekId}>
                {showDivider && (
                  <View style={styles.monthDivider}>
                    <Text style={styles.monthDividerText}>{monthLabel.toUpperCase()}</Text>
                  </View>
                )}
                <View style={styles.row}>
                  <Text style={styles.weekCell}>{week.weekLabel}</Text>
                  <Text style={styles.groupCell}>{week.majorGroupName ?? "—"}</Text>
                  <Text style={styles.groupCell}>{week.minorGroupName ?? "—"}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <CleaningInstructions />
      </PdfPage>
    </Document>
  );
}
