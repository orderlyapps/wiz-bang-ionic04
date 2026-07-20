import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Checkbox } from "../checkbox/Checkbox";

const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  leftText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  valueText: {
    fontSize: 11,
    fontWeight: "normal",
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
  },
  justifiedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
});

function formatDate(date_str: string): string {
  if (!date_str) return "";
  const d = new Date(date_str);
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface ReportInfoProps {
  full_name: string;
  birth_date: string;
  baptism_date: string;
  gender: "male" | "female";
  other_sheep: boolean;
  anointed: boolean;
  is_elder: boolean;
  is_ministerial_servant: boolean;
  is_regular_pioneer: boolean;
  is_special_pioneer: boolean;
  is_field_missionary: boolean;
}

export function ReportInfo(props: ReportInfoProps) {
  return (
    <>
      <Text style={styles.title}>CONGREGATION'S PUBLISHER RECORD</Text>
      <View style={styles.row}>
        <Text style={styles.leftText}>
          Name: <Text style={styles.valueText}>{props.full_name}</Text>
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.leftText}>
          Date of birth: <Text style={styles.valueText}>{formatDate(props.birth_date)}</Text>
        </Text>
        <View style={styles.rightGroup}>
          <View style={{ width: "50%" }}>
            <Checkbox checked={props.gender === "male"} label="Male" />
          </View>
          <View style={{ width: "50%" }}>
            <Checkbox checked={props.gender === "female"} label="Female" />
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.leftText}>
          Date of baptism: <Text style={styles.valueText}>{formatDate(props.baptism_date)}</Text>
        </Text>
        <View style={styles.rightGroup}>
          <View style={{ width: "50%" }}>
            <Checkbox checked={props.other_sheep} label="Other sheep" />
          </View>
          <View style={{ width: "50%" }}>
            <Checkbox checked={props.anointed} label="Anointed" />
          </View>
        </View>
      </View>
      <View style={styles.justifiedRow}>
        <Checkbox checked={props.is_elder} label="Elder" />
        <Checkbox checked={props.is_ministerial_servant} label="Ministerial servant" />
        <Checkbox checked={props.is_regular_pioneer} label="Regular pioneer" />
        <Checkbox checked={props.is_special_pioneer} label="Special pioneer" />
        <Checkbox checked={props.is_field_missionary} label="Field missionary" />
      </View>
    </>
  );
}
