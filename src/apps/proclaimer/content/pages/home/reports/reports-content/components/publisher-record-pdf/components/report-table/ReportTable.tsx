import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { MonthReport } from "../../types";

const W = ["15%", "12.5%", "12.5%", "12.5%", "12.5%", "35%"];

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  cellView: { padding: 1, borderColor: "black" },
  cellText: { fontSize: 10, padding: 1, paddingHorizontal: 4 },
  headerText: { fontSize: 10, fontWeight: "bold", textAlign: "center" },
  headerCell: { justifyContent: "center", paddingVertical: 8 },
  headerSubText: { fontSize: 9, textAlign: "center", marginTop: 2 },
  totalLabelText: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
    padding: 3,
    paddingRight: 6,
  },
  totalCellText: { fontSize: 12, textAlign: "center" },
});

function borders(col: number, isHeader: boolean, isLast: boolean) {
  return {
    borderTopWidth: isHeader ? 1.3 : 0,
    borderBottomWidth: isLast ? 1.3 : 0.3,
    borderLeftWidth: col === 0 ? 1.3 : 0.3,
    borderRightWidth: col === 5 ? 1.3 : 0.3,
  };
}

function HeaderRow({ service_year }: { service_year: string }) {
  const labels = [
    "Service Year",
    "Shared in\nMinistry",
    "Bible\nStudies",
    "Auxiliary\nPioneer",
    "Hours",
    "Remarks",
  ];
  return (
    <View style={styles.row}>
      {labels.map((label, i) => (
        <View
          key={i}
          style={[styles.cellView, styles.headerCell, { width: W[i] }, borders(i, true, false)]}
        >
          <Text style={styles.headerText}>{label}</Text>
          {i === 0 && <Text style={styles.headerSubText}>{service_year}</Text>}
        </View>
      ))}
    </View>
  );
}

function DataRow({ report, isLast }: { report: MonthReport; isLast: boolean }) {
  const c = { textAlign: "center" as const };
  const l = { textAlign: "left" as const };
  return (
    <View style={styles.row}>
      <View style={[styles.cellView, { width: W[0] }, borders(0, false, isLast)]}>
        <Text style={[styles.cellText, l]}>{report.month_name}</Text>
      </View>
      <View style={[styles.cellView, { width: W[1] }, borders(1, false, isLast)]}>
        <Text style={[styles.cellText, c]}>{report.active ? "X" : ""}</Text>
      </View>
      <View style={[styles.cellView, { width: W[2] }, borders(2, false, isLast)]}>
        <Text style={[styles.cellText, c]}>{report.bible_studies ?? ""}</Text>
      </View>
      <View style={[styles.cellView, { width: W[3] }, borders(3, false, isLast)]}>
        <Text style={[styles.cellText, c]}>{report.auxiliary_pioneer ? "X" : ""}</Text>
      </View>
      <View style={[styles.cellView, { width: W[4] }, borders(4, false, isLast)]}>
        <Text style={[styles.cellText, c, { fontSize: 12 }]}>{report.hours ?? " "}</Text>
      </View>
      <View style={[styles.cellView, { width: W[5] }, borders(5, false, isLast)]}>
        <Text style={[styles.cellText, l]}>{report.comments ?? ""}</Text>
      </View>
    </View>
  );
}

function TotalRow({ total_hours }: { total_hours: number }) {
  return (
    <View style={styles.row}>
      <View
        style={{
          width: "52.5%",
          borderRightWidth: 0.5,
        }}
      >
        <Text style={styles.totalLabelText}>Total</Text>
      </View>
      <View
        style={[
          styles.cellView,
          {
            width: "12.5%",
            borderBottomWidth: 1.3,
            borderLeftWidth: 0.8,
            borderRightWidth: 0.8,
          },
        ]}
      >
        <Text style={styles.totalCellText}>{total_hours}</Text>
      </View>
      <View
        style={[
          styles.cellView,
          {
            width: "35%",
            borderBottomWidth: 1.3,
            borderLeftWidth: 0.5,
            borderRightWidth: 1.3,
          },
        ]}
      />
    </View>
  );
}

export function ReportTable({
  months,
  total_hours,
  service_year,
}: {
  months: MonthReport[];
  total_hours: number;
  service_year: string;
}) {
  return (
    <View>
      <HeaderRow service_year={service_year} />
      {months.map((report, i) => (
        <DataRow key={i} report={report} isLast={i === months.length - 1} />
      ))}
      <TotalRow total_hours={total_hours} />
    </View>
  );
}
