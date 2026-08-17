import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; 
import api from '../../services/api'; 

export default function TelaStatus() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [carregandoFoto, setCarregandoFoto] = useState(false);
  const [salvando, setSalvando] = useState(false);

  // 🚀 Novos estados para edição
  const [novoSetor, setNovoSetor] = useState('');
  const [novoTurno, setNovoTurno] = useState('');

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const idSalvo = await AsyncStorage.getItem('usuarioId');

      if (!idSalvo) {
        Alert.alert('Erro', 'Nenhum usuário autenticado encontrado.');
        return;
      }

      const resposta = await api.get(`/usuarios/${idSalvo}`);
      setUsuario(resposta.data);
      
      // Preenche os inputs com os dados atuais do banco
      setNovoSetor(resposta.data.setor || '');
      setNovoTurno(resposta.data.turno || '');

    } catch (erro) {
      console.error('Erro ao buscar perfil:', erro);
      Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
    } finally {
      setCarregando(false);
    }
  };

  // 🚀 Nova função para salvar as alterações (PUT)
  const salvarAlteracoes = async () => {
    setSalvando(true);
    try {
      const idSalvo = await AsyncStorage.getItem('usuarioId');
      
      // Bate na sua rota PUT /usuarios/:id
      await api.put(`/usuarios/${idSalvo}`, {
        setor: novoSetor,
        turno: novoTurno
      });

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      carregarPerfil(); // Recarrega os dados na tela
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao atualizar os dados.');
    } finally {
      setSalvando(false);
    }
  };

  const escolherEEnviarFoto = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], 
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (resultado.canceled) return;

    setCarregandoFoto(true);

    try {
      const imagemSelecionada = resultado.assets[0];
      const formData = new FormData();
      
      formData.append('foto', {
        uri: imagemSelecionada.uri,
        name: 'perfil.jpg',
        type: 'image/jpeg',
      });

      const idSalvo = await AsyncStorage.getItem('usuarioId');

      await api.patch(`/usuarios/${idSalvo}/foto`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Alert.alert('Sucesso', 'Foto atualizada com sucesso!');
      carregarPerfil(); 
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao enviar a foto para o servidor.');
    } finally {
      setCarregandoFoto(false);
    }
  };

  const imagemExibicao = usuario?.foto 
    ? { uri: `data:image/jpeg;base64,${usuario.foto}` }
    : { uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        
        {/* Foto do Crachá */}
        <View style={styles.fotoContainer}>
          <Image source={imagemExibicao} style={styles.foto} />
          <TouchableOpacity 
            style={styles.botaoFoto} 
            onPress={escolherEEnviarFoto} 
            disabled={carregandoFoto}
          >
            <Text style={styles.botaoFotoTexto}>
              {carregandoFoto ? 'Enviando...' : 'Trocar Foto'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Informações Fijas */}
        {carregando ? (
          <ActivityIndicator size="large" color="#003366" style={{ marginTop: 20 }} />
        ) : (
          <View style={styles.dadosContainer}>
            <Text style={styles.label}>Nome do Operador:</Text>
            <Text style={styles.valorFixo}>{usuario?.nome || 'Não informado'}</Text>

            <Text style={styles.label}>E-mail:</Text>
            <Text style={styles.valorFixo}>{usuario?.email || 'Não informado'}</Text>

            {/* 🚀 Campos Editáveis */}
            <View style={styles.linhaDivisoria} />
            <Text style={styles.tituloEdicao}>Informações de Trabalho</Text>

            <Text style={styles.label}>Setor / Área:</Text>
            <TextInput
              style={styles.input}
              value={novoSetor}
              onChangeText={setNovoSetor}
              placeholder="Ex: TI, Manutenção, Vendas..."
            />

            <Text style={styles.label}>Turno:</Text>
            <TextInput
              style={styles.input}
              value={novoTurno}
              onChangeText={setNovoTurno}
              placeholder="Ex: Manhã, Tarde, Noite..."
            />

            <TouchableOpacity 
              style={[styles.botaoSalvar, salvando && { opacity: 0.7 }]} 
              onPress={salvarAlteracoes}
              disabled={salvando}
            >
              <Text style={styles.botaoSalvarTexto}>
                {salvando ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
              </Text>
            </TouchableOpacity>

          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f5f5f5', alignItems: 'center' },
  fotoContainer: { alignItems: 'center', marginBottom: 20, marginTop: 10 },
  foto: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#003366' },
  botaoFoto: { marginTop: 10, backgroundColor: '#003366', padding: 8, borderRadius: 5, paddingHorizontal: 15 },
  botaoFotoTexto: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  dadosContainer: { width: '100%', backgroundColor: 'white', padding: 20, borderRadius: 8, elevation: 2, marginBottom: 20 },
  label: { fontSize: 12, color: '#888', marginTop: 10, textTransform: 'uppercase', fontWeight: 'bold' },
  valorFixo: { fontSize: 16, color: '#333', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5, marginBottom: 5 },
  linhaDivisoria: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  tituloEdicao: { fontSize: 16, fontWeight: 'bold', color: '#003366', marginBottom: 10, textAlign: 'center' },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginTop: 5,
    marginBottom: 10,
  },
  botaoSalvar: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  botaoSalvarTexto: { color: 'white', fontWeight: 'bold', fontSize: 14 }
});