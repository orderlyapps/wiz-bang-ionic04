import { StyleSheet } from "@react-pdf/renderer";

export interface MapLogPdfEntry {
  publisher_name: string;
  checked_out_at: string | null;
  checked_in_at: string | null;
}

export interface MapLogPdfRow {
  map_name: string;
  last_date_completed: string | null;
  logs: MapLogPdfEntry[];
}

export const shared = StyleSheet.create({
  footer: { position: "absolute", bottom: 24, left: 30, right: 30 },
  table: { borderWidth: 3, borderColor: "#000", flex: 1, marginTop: 2, marginBottom: 30 },
  firstCol: { flex: 1, borderRightWidth: 3, borderRightColor: "#000" },
  firstColSub: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: "#000",
    padding: 1,
    justifyContent: "center",
  },
  firstColSubLast: { flex: 2, padding: 1, justifyContent: "center" },
  rightCol: { flex: 1, borderRightWidth: 2, borderRightColor: "#000" },
  rightColLast: { flex: 1 },
  rightColTop: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    padding: 1,
    justifyContent: "center",
  },
  rightColBottom: { flex: 2 },
  rightColSubBottom: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: "#000",
    padding: 1,
    justifyContent: "center",
  },
  rightColSubBottomLast: { flex: 1, padding: 1, justifyContent: "center" },
});

export const headerStyles = StyleSheet.create({
  row: {
    minHeight: 40,
    borderBottomWidth: 1.5,
    borderBottomColor: "#000",
    backgroundColor: "#e8e8e8",
  },
  text: { fontSize: 8, textAlign: "center" },
  textDate: { fontSize: 8, textAlign: "center", lineHeight: 1 },
  rightColTop: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    padding: 1,
    justifyContent: "center",
  },
  rightColBottom: { flex: 2.5 },
  firstColSub: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: "#000",
    padding: 1,
    justifyContent: "center",
  },
  firstColSubLast: { flex: 2, padding: 1, justifyContent: "center" },
  rightColSubBottom: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: "#000",
    padding: 1,
    justifyContent: "center",
  },
  rightColSubBottomLast: { flex: 1, padding: 1, justifyContent: "center" },
  firstCol: { flex: 1, borderRightWidth: 3, borderRightColor: "#000" },
});

export const bodyStyles = StyleSheet.create({
  row: { flex: 1, borderBottomWidth: 1.5, borderBottomColor: "#000" },
  rowLast: { flex: 1 },
  text: { fontSize: 8, textAlign: "center" },
});
