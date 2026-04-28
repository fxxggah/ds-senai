import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Clube da Fé</Text>
        <Text style={styles.title}>São Paulo</Text>
        <Text style={styles.titleBold}>Futebol Clube</Text>
        <View style={styles.divider} />
        <Text style={styles.year}>Fundado em 1930</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#1A1A1A",
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E30613",
    shadowColor: "#E30613",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },

  subtitle: {
    color: "#AAAAAA",
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 10,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "300",
  },

  titleBold: {
    color: "#E30613",
    fontSize: 32,
    fontWeight: "bold",
  },

  divider: {
    width: 60,
    height: 3,
    backgroundColor: "#E30613",
    marginVertical: 20,
    borderRadius: 2,
  },

  year: {
    color: "#CCCCCC",
    fontSize: 14,
  },
});