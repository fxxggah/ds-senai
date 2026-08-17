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
import api from '../services/api'; 

// =========================================================
// TELA DE SUPORTE TÉCNICO / ABERTURA DE CHAMADOS (TI)
// Permite registrar incidentes e solicitações de assistência
// =========================================================

export default function TelaSuporte() {
  // Estados para armazenamento dos dados do chamado
  const [operador, setOperador] = useState('');
  const [setor, setSetor] = useState('');
  const [descricao, setDescricao] = useState('');

  // =========================================================
  // FUNÇÃO: Envio e abertura do chamado de suporte na API
  // =========================================================
  const enviarChamado = async () => {
    // Validação dos campos obrigatórios
    if (!operador || !setor || !descricao) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos do chamado.');
      return;
    }

    try {
      // Requisição POST para o endpoint de chamados (/suporte)
      await api.post('/suporte', {
        operador: operador,
        setor: setor,
        descricao: descricao
      });

      // Confirmação de envio e limpeza do formulário
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
        
        {/* Cabeçalho da Tela */}
        <Text style={styles.titulo}>Suporte Técnico</Text>
        
        <Text style={{ marginBottom: 20, textAlign: 'center', color: '#555' }}>
          Encontrou algum problema? Abra um chamado para a equipe de TI avaliar.
        </Text>
        
        {/* Campo: Nome do Operador */}
        <TextInput
          style={styles.input}
          placeholder="Nome do Operador"
          value={operador}
          onChangeText={setOperador}
        />

        {/* Campo: Setor do Operador */}
        <TextInput
          style={styles.input}
          placeholder="Seu Setor"
          value={setor}
          onChangeText={setSetor}
        />

        {/* Campo: Descrição Detalhada do Problema */}
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Descreva o problema detalhadamente..."
          multiline={true}
          numberOfLines={4}
          value={descricao}
          onChangeText={setDescricao}
        />
        
        {/* Botão de Envio do Chamado */}
        <TouchableOpacity style={styles.botao} onPress={enviarChamado}>
          <Text style={styles.botaoTexto}>ENVIAR CHAMADO</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}