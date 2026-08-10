import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function TelaStatus() {
  return (
    <View style={styles.container}>
      
      {/* Espaço reservado para a Foto do Crachá (BLOB) */}
      <View style={styles.fotoContainer}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} 
          style={styles.foto} 
        />
        <TouchableOpacity style={styles.botaoFoto}>
          <Text style={styles.botaoFotoTexto}>Trocar Foto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dadosContainer}>
        <Text style={styles.label}>Nome do Operador:</Text>
        <Text style={styles.valor}>Carregando...</Text>

        <Text style={styles.label}>Setor / Área:</Text>
        <Text style={styles.valor}>Carregando...</Text>

        <Text style={styles.label}>Status atual:</Text>
        <Text style={[styles.valor, { color: 'green', fontWeight: 'bold' }]}>Ativo na Planta</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', alignItems: 'center' },
  fotoContainer: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
  foto: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#003366' },
  botaoFoto: { marginTop: 10, backgroundColor: '#003366', padding: 8, borderRadius: 5 },
  botaoFotoTexto: { color: 'white', fontWeight: 'bold' },
  dadosContainer: { width: '100%', backgroundColor: 'white', padding: 20, borderRadius: 8, elevation: 2 },
  label: { fontSize: 14, color: '#888', marginTop: 10 },
  valor: { fontSize: 18, color: '#333', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 }
});