import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert 
} from 'react-native';
import { styles } from './index'; 
import api from '../services/api'; // 🔌 Conexão com o backend

export default function TelaSuporte() {
  // 1. Novos estados para o Suporte
  const [operador, setOperador] = useState('');
  const [setor, setSetor] = useState('');
  const [descricao, setDescricao] = useState('');

  // 2. Função assíncrona para envio
  const enviarChamado = async () => {
    if (!operador || !setor || !descricao) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos do chamado.');
      return;
    }

    try {
      // 3. POST para a rota /suporte
      await api.post('/suporte', {
        operador: operador,
        setor: setor,
        descricao: descricao
      });

      // 4. Alerta de sucesso e limpeza
      Alert.alert('Sucesso', 'Chamado aberto na TI!');
      setOperador('');
      setSetor('');
      setDescricao('');

    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro', 'Não foi possível enviar o chamado.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 80}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5" />
        
        <Text style={styles.titulo}>Suporte Técnico</Text>
        
        <Text style={{ marginBottom: 20, textAlign: 'center', color: '#555' }}>
          Encontrou algum problema? Abra um chamado para a equipe de TI avaliar.
        </Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nome do Operador"
          value={operador}
          onChangeText={setOperador}
        />

        <TextInput
          style={styles.input}
          placeholder="Seu Setor"
          value={setor}
          onChangeText={setSetor}
        />

        {/* Input maior para o usuário descrever o problema */}
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Descreva o problema detalhadamente..."
          multiline={true}
          numberOfLines={4}
          value={descricao}
          onChangeText={setDescricao}
        />
        
        <TouchableOpacity style={styles.botao} onPress={enviarChamado}>
          <Text style={styles.botaoTexto}>ENVIAR CHAMADO</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}