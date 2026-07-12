import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type React from "react";
import type { ContactWithDetails } from "../hooks/useContactsForExport";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 15,
    fontSize: 9,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 3,
    color: "#666",
  },
  table: {
    flexDirection: "column",
    width: "auto",
  },
  tableRow: {
    flexDirection: "row",
    padding: 2.5,
  },
  tableHeaderRow: {
    flexDirection: "row",
    padding: 1,
  },
  tableColHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#f0f0f0",
    padding: 1,
  },
  tableCol: {},
  colName: { width: "16%" },
  colAddress: { width: "24%", fontSize: 9 },
  colPhone: { width: "10%" },
  colEmail: { width: "23%", fontSize: 9 },
  colEmergencyName: { width: "16%" },
  colEmergencyPhone: { width: "10%" },
  tableCellHeader: {
    fontSize: 8,
    fontWeight: "bold",
  },
  tableCell: {
    textAlign: "left",
  },
  tableCellIndented: {
    fontSize: 8,
    textAlign: "left",
    paddingLeft: 16,
  },
  noData: {
    textAlign: "center",
    fontSize: 12,
  },
});

/**
 * Props for the ContactsPdfDocument component
 */
interface ContactsPdfDocumentProps {
  /** Array of contacts with their contact information */
  contacts: ContactWithDetails[];
  /** Optional title for the document */
  title?: string;
  /** Optional subtitle for the document */
  subtitle?: string;
}

/**
 * PDF document component for exporting elder contact information
 * Displays elder names, addresses, phone numbers, emails, and emergency contacts in a table format
 */
export const ContactsPdfDocument: React.FC<ContactsPdfDocumentProps> = ({
  contacts,
  title = "Elder Contact List",
  subtitle = `Generated on ${new Date().toLocaleDateString()}`,
}) => {
  if (contacts.length === 0) {
    return (
      <Document>
        <Page size="A4" style={styles.page} orientation="landscape">
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.noData}>No elders found</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        {/* Title and subtitle rendered once */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.table}>
          {/* Fixed table header — repeats on each page automatically */}
          <View style={styles.tableHeaderRow}>
            <View style={[styles.tableColHeader, styles.colName]}>
              <Text style={styles.tableCellHeader}>Name</Text>
            </View>
            <View style={[styles.tableColHeader, styles.colAddress]}>
              <Text style={styles.tableCellHeader}>Address</Text>
            </View>
            <View style={[styles.tableColHeader, styles.colPhone]}>
              <Text style={styles.tableCellHeader}>Phone</Text>
            </View>
            <View style={[styles.tableColHeader, styles.colEmail]}>
              <Text style={styles.tableCellHeader}>Email</Text>
            </View>
            <View style={[styles.tableColHeader, styles.colEmergencyName]}>
              <Text style={styles.tableCellHeader}>Emergency Contact</Text>
            </View>
            <View style={[styles.tableColHeader, styles.colEmergencyPhone]}>
              <Text style={styles.tableCellHeader}>Emergency Phone</Text>
            </View>
          </View>

          {/* Table rows — react-pdf handles page breaks automatically */}
          {contacts.map((contact) => (
            <View key={contact.id} style={styles.tableRow} wrap={false}>
              <View style={[styles.tableCol, styles.colName]}>
                <Text style={styles.tableCell}>
                  <Text style={{ fontWeight: "bold" }}>{contact.last_name}</Text>
                  {`, ${contact.display_name ?? contact.first_name}`}
                </Text>
              </View>
              <View style={[styles.tableCol, styles.colAddress]}>
                <Text style={styles.tableCell}>
                  {contact.address
                    ? [contact.address.street_line, contact.address.suburb]
                        .filter(Boolean)
                        .join(", ") || "-"
                    : "-"}
                </Text>
              </View>
              <View style={[styles.tableCol, styles.colPhone]}>
                <Text style={styles.tableCell}>{contact.phone || "-"}</Text>
              </View>
              <View style={[styles.tableCol, styles.colEmail]}>
                <Text style={styles.tableCell}>{contact.email || "-"}</Text>
              </View>
              <View style={[styles.tableCol, styles.colEmergencyName]}>
                <Text style={styles.tableCell}>
                  {contact.emergency_contact
                    ? `${contact.emergency_contact.last_name}, ${contact.emergency_contact.first_name}`
                    : "-"}
                </Text>
              </View>
              <View style={[styles.tableCol, styles.colEmergencyPhone]}>
                <Text style={styles.tableCell}>{contact.emergency_contact?.phone || "-"}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
