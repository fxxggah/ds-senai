import { View, Text, StyleSheet } from 'react-native';

// =========================================================
// TELA INICIAL / DASHBOARD DA ÁREA RESTRITA
// Mapeia a primeira aba do aplicativo (app/(tabs)/home.js)
// Exibe os avisos gerais e comunicados da fábrica
// =========================================================

export default function TelaInicialRestrita() {
  return (
    <View style={styles.container}>
      {/* Título principal do painel */}
      <Text style={styles.boasVindas}>Painel de Controle</Text>
      
      {/* Card Informativo: Mural de avisos corporativos */}
      <View style={styles.cardInfo}>
        <Text style={styles.tituloCard}>Avisos da Fábrica</Text>
        <Text style={styles.textoCard}>- Reunião de CIPA às 14h.</Text>
        <Text style={styles.textoCard}>- Manutenção preventiva na fresadora 02.</Text>
      </View>
    </View>
  );
}

// =========================================================
// ESTILIZAÇÃO COMPONENTE (StyleSheet)
// =========================================================

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