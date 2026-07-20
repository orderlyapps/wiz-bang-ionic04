import { Document, Page, Text, View, TextInput, Checkbox, StyleSheet } from "@react-pdf/renderer";
import type { Publisher } from "@shared/database/schemas/publisher";

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 10 },
  title: { fontSize: 14, fontWeight: "bold", textAlign: "center", marginBottom: 4 },
  subtitle: { fontSize: 11, textAlign: "center", marginBottom: 12 },
  row: { flexDirection: "row", height: 25 },
  cellView: { padding: 1, borderColor: "black" },
  cellText: { fontSize: 9, padding: 1, paddingHorizontal: 3 },
  headerText: { fontSize: 9, fontWeight: "bold", textAlign: "center" },
  headerCell: { justifyContent: "center", paddingVertical: 6 },
  nameCellText: { fontSize: 9, padding: 1, paddingHorizontal: 3 },
  input: { fontSize: 9, paddingHorizontal: 12, paddingVertical: 1, width: "100%", height: "100%" },
  checkbox: { width: 12, height: 12 },
  checkboxCell: { alignItems: "center", justifyContent: "center" },
});

const W = ["20%", "7.5%", "7.5%", "7.5%", "7.5%", "50%"];

function borders(col: number, isHeader: boolean, isLast: boolean) {
  return {
    borderTopWidth: isHeader ? 1.3 : 0,
    borderBottomWidth: isLast ? 1.3 : 0.3,
    borderLeftWidth: col === 0 ? 1.3 : 0.3,
    borderRightWidth: col === 5 ? 1.3 : 0.3,
  };
}

function HeaderRow() {
  const labels = ["Name", "Active", "Studies", "Aux", "Hrs", "Remarks"];
  return (
    <View style={styles.row}>
      {labels.map((label, i) => (
        <View
          key={i}
          style={[styles.cellView, styles.headerCell, { width: W[i] }, borders(i, true, false)]}
        >
          <Text style={styles.headerText}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

function PublisherRow({ name, index, isLast }: { name: string; index: number; isLast: boolean }) {
  const l = { textAlign: "left" as const };
  return (
    <View style={styles.row}>
      <View style={[styles.cellView, { width: W[0] }, borders(0, false, isLast)]}>
        <Text style={[styles.nameCellText, l]}>{name}</Text>
      </View>
      <View
        style={[styles.cellView, styles.checkboxCell, { width: W[1] }, borders(1, false, isLast)]}
      >
        <Checkbox name={`active_${index}`} style={styles.checkbox} />
      </View>
      <View style={[styles.cellView, { width: W[2] }, borders(2, false, isLast)]}>
        <TextInput name={`bible_studies_${index}`} style={styles.input} align="center" />
      </View>
      <View
        style={[styles.cellView, styles.checkboxCell, { width: W[3] }, borders(3, false, isLast)]}
      >
        <Checkbox name={`aux_pio_${index}`} style={styles.checkbox} />
      </View>
      <View style={[styles.cellView, { width: W[4] }, borders(4, false, isLast)]}>
        <TextInput name={`hours_${index}`} style={styles.input} align="center" />
      </View>
      <View style={[styles.cellView, { width: W[5] }, borders(5, false, isLast)]}>
        <TextInput name={`comments_${index}`} style={styles.input} multiline align="center" />
      </View>
    </View>
  );
}

interface GroupReportFormPdfProps {
  group_name: string;
  congregation_name: string | undefined;
  month_label: string;
  publishers: Publisher[];
}

export function GroupReportFormPdf({
  group_name,
  congregation_name,
  month_label,
  publishers,
}: GroupReportFormPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Field Service Report — {group_name}</Text>
        <Text style={styles.subtitle}>
          {congregation_name ? `${congregation_name} — ` : ""}
          {month_label}
        </Text>
        <HeaderRow />
        {publishers.map((p, i) => {
          const first = p.display_name ?? p.first_name;
          const name = `${first} ${p.last_name}`;
          return (
            <PublisherRow
              key={p.id ?? i}
              name={name}
              index={i}
              isLast={i === publishers.length - 1}
            />
          );
        })}
      </Page>
    </Document>
  );
}
