import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { ReportInfo } from "../report-info/ReportInfo";
import { ReportTable } from "../report-table/ReportTable";
import type { PublisherRecordData, ServiceYearReportData } from "../../types";

const styles = StyleSheet.create({
  container: { marginBottom: 4 },
  footer: { fontSize: 6, textAlign: "left", marginTop: 1 },
});

interface ServiceYearReportProps {
  publisher: PublisherRecordData;
  report: ServiceYearReportData;
}

export function ServiceYearReport({ publisher, report }: ServiceYearReportProps) {
  return (
    <View style={styles.container}>
      <ReportInfo
        full_name={publisher.full_name}
        birth_date={publisher.birth_date}
        baptism_date={publisher.baptism_date}
        gender={publisher.gender}
        other_sheep={publisher.other_sheep}
        anointed={publisher.anointed}
        is_elder={publisher.standing === "elder"}
        is_ministerial_servant={publisher.standing === "ministerial_servant"}
        is_regular_pioneer={publisher.type === "regular_pioneer"}
        is_special_pioneer={publisher.type === "special_pioneer"}
        is_field_missionary={publisher.type === "field_missionary"}
      />
      <ReportTable months={report.months} total_hours={report.total_hours} />
      <Text style={styles.footer}>S-21-E</Text>
    </View>
  );
}
