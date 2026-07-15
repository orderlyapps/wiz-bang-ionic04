import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    width: 10,
    height: 10,
    borderWidth: 0.5,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
  },
  check: {
    fontSize: 8,
    lineHeight: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    marginRight: 6,
    paddingLeft: 2,
  },
});

export function Checkbox({ checked, label }: { checked: boolean; label: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.box}>{checked && <Text style={styles.check}>X</Text>}</View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}
