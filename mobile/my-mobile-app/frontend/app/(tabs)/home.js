import { View, Text, StyleSheet } from 'react-native';

export default function TelaInicialRestrita() {
  return (
    <View style={styles.container}>
      <Text style={styles.boasVindas}>Painel de Controle</Text>
      
      <View style={styles.cardInfo}>
        <Text style={styles.tituloCard}>Avisos da Fábrica</Text>
        <Text style={styles.textoCard}>- Reunião de CIPA às 14h.</Text>
        <Text style={styles.textoCard}>- Manutenção preventiva na fresadora 02.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  boasVindas: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  cardInfo: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tituloCard: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  textoCard: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  }
});