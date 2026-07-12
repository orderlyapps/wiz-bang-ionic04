import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottom: "0.5pt solid #ddd",
  },
  label: {
    width: "30%",
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    width: "70%",
    fontSize: 11,
    color: "#333",
  },
  empty: {
    fontSize: 11,
    color: "#999",
    fontStyle: "italic",
  },
});

export type ClamAssignmentPdfData = {
  date: string;
  school: string;
  student: string;
  assistant?: string;
  counselor: string;
  assignment: string;
  material: string;
};

type ClamAssignmentPdfProps = {
  data: ClamAssignmentPdfData;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={value ? styles.value : styles.empty}>{value || "—"}</Text>
    </View>
  );
}

export function ClamAssignmentPdf({ data }: ClamAssignmentPdfProps) {
  return (
    <Document>
      <Page size="A6" orientation="landscape" style={styles.page}>
        <Text style={styles.title}>Our Christian Life & Ministry Meeting Assignment</Text>
        <Row label="Date:" value={data.date} />
        <Row label="School:" value={data.school} />
        <Row label="Student:" value={data.student} />
        {data.assistant && <Row label="Assistant:" value={data.assistant} />}
        <Row label="Counselor:" value={data.counselor} />
        <Row label="Assignment:" value={data.assignment} />
        <Row label="Material:" value={data.material} />
      </Page>
    </Document>
  );
}
