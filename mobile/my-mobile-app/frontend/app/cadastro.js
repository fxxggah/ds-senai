import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import { styles } from './index'; 
import api from '../services/api'; 

// =========================================================
// TELA DE CADASTRO DE EQUIPE / NOVOS FUNCIONÁRIOS
// Permite registrar novos membros da loja no sistema
// =========================================================

export default function TelaCadastro() {
  // Estados para armazenamento dos dados do formulário
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // =========================================================
  // FUNÇÃO: Envio de dados e registro via API Gateway
  // =========================================================
  const registrarEquipe = async () => {
    // Validação básica dos campos obrigatórios
    if (!nome || !cargo || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os dados do funcionário!');
      return;
    }

    try {
      // Rota enviada via API Gateway: /api/auth/cadastro -> Backend:3003
      const resposta = await api.post('/api/auth/cadastro', {
        nome: nome,
        email: email,
        senha: senha,
        setor: cargo 
      });

      Alert.alert('Sucesso!', resposta.data.message || `Membro da equipe ${nome} cadastrado.`);

      // Limpa os campos do formulário após sucesso
      setNome('');
      setCargo('');
      setEmail('');
      setSenha('');

    } catch (erro) {
      console.error(erro);
      if (erro.response) {
        Alert.alert('Atenção', erro.response.data.error);
      } else {
        Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor.');
      }
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
        <Text style={styles.titulo}>Nova Conta</Text>
        <Text style={styles.subtitulo}>Cadastro de equipe da loja</Text>

        {/* Campo: Nome Completo */}
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
        />

        {/* Campo: Cargo / Setor */}
        <TextInput
          style={styles.input}
          placeholder="Cargo (Ex: Vendedor, Caixa, Gerente)"
          value={cargo}
          onChangeText={setCargo}
        />

        {/* Campo: E-mail Corporativo */}
        <TextInput
          style={styles.input}
          placeholder="E-mail corporativo"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Campo: Senha */}
        <TextInput
          style={styles.input}
          placeholder="Crie uma senha de acesso"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />

        {/* Botão de Envio do Formulário */}
        <TouchableOpacity style={styles.botao} onPress={registrarEquipe}>
          <Text style={styles.botaoTexto}>CADASTRAR FUNCIONÁRIO</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}