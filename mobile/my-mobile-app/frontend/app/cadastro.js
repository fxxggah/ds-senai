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
import { styles } from './index'; // Importando o visual da tela principal
import api from '../services/api'; // 🔌 Importando nossa conexão com o backend

export default function TelaCadastro() {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // 🔌 Transformando a função em assíncrona (async)
  const registrarEquipe = async () => {
    // Validação básica
    if (!nome || !cargo || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os dados do funcionário!');
      return;
    }

    try {
      // 🔌 Enviando o POST para o nosso backend real (Rota /cadastro)
      // Mapeamos 'cargo' para 'setor' para combinar com o que o backend espera
      const resposta = await api.post('/cadastro', {
        nome: nome,
        email: email,
        senha: senha,
        setor: cargo 
      });

      // Sucesso!
      Alert.alert('Sucesso!', resposta.data.message || `Membro da equipe ${nome} cadastrado.`);

      // Limpa os campos após salvar
      setNome('');
      setCargo('');
      setEmail('');
      setSenha('');

    } catch (erro) {
      console.error(erro);
      if (erro.response) {
        // Erro retornado pelo backend (ex: e-mail já existe)
        Alert.alert('Atenção', erro.response.data.error);
      } else {
        // Erro de rede (ex: IP errado, servidor Node desligado)
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
        
        <Text style={styles.titulo}>Nova Conta</Text>
        <Text style={styles.subtitulo}>Cadastro de equipe da loja</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Cargo (Ex: Vendedor, Caixa, Gerente)"
          value={cargo}
          onChangeText={setCargo}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail corporativo"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Crie uma senha de acesso"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.botao} onPress={registrarEquipe}>
          <Text style={styles.botaoTexto}>CADASTRAR FUNCIONÁRIO</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}