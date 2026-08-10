import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 💾 1. Importação do AsyncStorage
import api from '../../services/api'; 

export default function TelaStatus() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      // 💾 2. Recupera o ID salvo no momento do login
      const idSalvo = await AsyncStorage.getItem('usuarioId');

      if (!idSalvo) {
        Alert.alert('Erro', 'Nenhum usuário autenticado encontrado.');
        return;
      }

      // 🚀 3. Faz a requisição usando o ID dinâmico do usuário
      const resposta = await api.get(`/usuarios/${idSalvo}`);
      setUsuario(resposta.data);

    } catch (erro) {
      console.error('Erro ao buscar perfil:', erro);
      Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Foto do Crachá */}
      <View style={styles.fotoContainer}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} 
          style={styles.foto} 
        />
        <TouchableOpacity style={styles.botaoFoto}>
          <Text style={styles.botaoFotoTexto}>Trocar Foto</Text>
        </TouchableOpacity>
      </View>

      {/* Exibe o indicador de carregando ou os dados vindos do banco */}
      {carregando ? (
        <ActivityIndicator size="large" color="#003366" style={{ marginTop: 20 }} />
      ) : (
        <View style={styles.dadosContainer}>
          <Text style={styles.label}>Nome do Operador:</Text>
          <Text style={styles.valor}>{usuario?.nome || 'Não informado'}</Text>

          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.valor}>{usuario?.email || 'Não informado'}</Text>

          <Text style={styles.label}>Setor / Área:</Text>
          <Text style={styles.valor}>{usuario?.setor || 'Geral'}</Text>

          <Text style={styles.label}>Status atual:</Text>
          <Text style={[styles.valor, { color: 'green', fontWeight: 'bold' }]}>Ativo na Planta</Text>
        </View>
      )}

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