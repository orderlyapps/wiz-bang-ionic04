import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    marginTop: 30,
  },
  column: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },

  item: {
    fontSize: 12,
    color: "#333",
    marginBottom: 2,
  },
  itemContinued: {
    fontSize: 12,
    color: "#333",
    marginLeft: 8,
  },
});

const thoroughCleanItems = [
  "Clean glass & mirrors",
  "Wipe table tops & lectern",
  "Static dust furniture",
  "Clean toilets",
  "Clean floor & walls including\npartitions & cabinets",
  "Clean hand basins & sinks",
  "Clean outside of appliances",
  "Thorough vacuum",
  "Mop tiled floors",
  "Collect & empty rubbish",
  "Check for cobwebs",
  "Check for rubbish outside",
];

const lightCleanItems = [
  "Spot vacuum high traffic areas",
  "Straighten chairs",
  "Check toilets, toilet paper and\nwipe down basins",
  "Wipe down and pack away kitchen",
  "Check bins",
];

export function CleaningInstructions() {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.title}>Thorough Clean Instructions</Text>
        {thoroughCleanItems.map((item) => {
          const lines = item.split("\n");
          return (
            <View key={item} style={{ marginBottom: 8 }}>
              <Text style={styles.item}>{"\u2022 " + lines[0]}</Text>
              {lines.slice(1).map((line, i) => (
                <Text key={i} style={styles.itemContinued}>
                  {line}
                </Text>
              ))}
            </View>
          );
        })}
      </View>
      <View style={styles.column}>
        <Text style={styles.title}>Light Clean Instructions</Text>
        {lightCleanItems.map((item) => {
          const lines = item.split("\n");
          return (
            <View key={item} style={{ marginBottom: 8 }}>
              <Text style={styles.item}>{"\u2022 " + lines[0]}</Text>
              {lines.slice(1).map((line, i) => (
                <Text key={i} style={styles.itemContinued}>
                  {line}
                </Text>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
}
