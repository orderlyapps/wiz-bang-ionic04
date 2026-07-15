import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { MonthReport } from "../../types";

const W = ["15%", "10%", "10%", "12%", "13%", "40%"];

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  cellView: { padding: 1, borderColor: "black" },
  cellText: { fontSize: 8 },
  headerText: { fontSize: 8, fontWeight: "bold", textAlign: "center" },
  totalLabelText: { fontSize: 8, fontWeight: "bold", textAlign: "right" },
  totalCellText: { fontSize: 8, textAlign: "center" },
});

function borders(col: number, isHeader: boolean) {
  return {
    borderTopWidth: isHeader ? 2 : 0,
    borderBottomWidth: 1,
    borderLeftWidth: col === 0 ? 2 : 1,
    borderRightWidth: col === 5 ? 2 : 1,
  };
}

function HeaderRow() {
  const labels = ["Month", "Shared in\nMinistry", "Bible\nStudies", "Auxiliary\nPioneer", "Hours", "Remarks"];
  return (
    <View style={styles.row}>
      {labels.map((label, i) => (
        <View key={i} style={[styles.cellView, { width: W[i] }, borders(i, true)]}>
          <Text style={styles.headerText}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

function DataRow({ report }: { report: MonthReport }) {
  const c = { textAlign: "center" as const };
  const l = { textAlign: "left" as const };
  return (
    <View style={styles.row}>
      <View style={[styles.cellView, { width: W[0] }, borders(0, false)]}>
        <Text style={[styles.cellText, l]}>{report.month_name}</Text>
      </View>
      <View style={[styles.cellView, { width: W[1] }, borders(1, false)]}>
        <Text style={[styles.cellText, c]}>{report.active ? "X" : ""}</Text>
      </View>
      <View style={[styles.cellView, { width: W[2] }, borders(2, false)]}>
        <Text style={[styles.cellText, c]}>{report.bible_studies ?? ""}</Text>
      </View>
      <View style={[styles.cellView, { width: W[3] }, borders(3, false)]}>
        <Text style={[styles.cellText, c]}>{report.auxiliary_pioneer ? "X" : ""}</Text>
      </View>
      <View style={[styles.cellView, { width: W[4] }, borders(4, false)]}>
        <Text style={[styles.cellText, c]}>{report.hours ?? ""}</Text>
      </View>
      <View style={[styles.cellView, { width: W[5] }, borders(5, false)]}>
        <Text style={[styles.cellText, l]}>{report.comments ?? ""}</Text>
      </View>
    </View>
  );
}

function TotalRow({ total_hours }: { total_hours: number }) {
  return (
    <View style={styles.row}>
      <View style={{ width: "35%" }} />
      <View style={{ width: "12%" }}>
        <Text style={styles.totalLabelText}>Total</Text>
      </View>
      <View style={[styles.cellView, { width: "13%", borderTopWidth: 2, borderBottomWidth: 2, borderLeftWidth: 2, borderRightWidth: 1 }]}>
        <Text style={styles.totalCellText}>{total_hours}</Text>
      </View>
      <View style={[styles.cellView, { width: "40%", borderTopWidth: 2, borderBottomWidth: 2, borderLeftWidth: 1, borderRightWidth: 2 }]} />
    </View>
  );
}

export function ReportTable({ months, total_hours }: { months: MonthReport[]; total_hours: number }) {
  return (
    <View>
      <HeaderRow />
      {months.map((report, i) => (
        <DataRow key={i} report={report} />
      ))}
      <TotalRow total_hours={total_hours} />
    </View>
  );
}
