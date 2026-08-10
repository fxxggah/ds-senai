import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { Link, useRouter } from 'expo-router'; // Adicionado useRouter
import api from '../services/api'; // 🔌 Importando nossa conexão com o backend

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter(); // Preparando para redirecionar o usuário no futuro

  // 🔌 Transformando a função em assíncrona (async)
  const fazerLogin = async () => {
    // Trocamos o alert da web pelo Alert nativo do celular
    if (email === '' || senha === '') {
      Alert.alert('Atenção', 'Preencha e-mail e senha para acessar o estoque!');
      return;
    }
    
    try {
      // 🔌 Enviando o POST para o nosso backend real (Rota /login)
      const resposta = await api.post('/login', {
        email: email,
        senha: senha
      });

      // Pega o nome retornado do banco de dados (se houver) ou mostra aviso padrão
      const nomeUsuario = resposta.data.usuario?.nome || email;
      Alert.alert('Acesso Permitido', `Bem-vindo(a), ${nomeUsuario}!`);
      
      // Aqui entrará a navegação para a próxima tela na Aula 6
      // router.replace('/(tabs)');

    } catch (erro) {
      console.error(erro);
      if (erro.response) {
        // Erro 401: Senha incorreta ou email não existe
        Alert.alert('Acesso Negado', erro.response.data.error);
      } else {
        // Erro de rede (IP errado ou servidor offline)
        Alert.alert('Erro', 'Servidor offline ou IP incorreto.');
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
        <StatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
        
        <Text style={styles.titulo}>InfoEstoque</Text>
        <Text style={styles.subtitulo}>Gestão de Peças e Periféricos</Text>
        
        <TextInput
          style={styles.input}
          placeholder="E-mail do Vendedor"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Senha de Acesso"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
        
        <TouchableOpacity style={styles.botao} onPress={fazerLogin}>
          <Text style={styles.botaoTexto}>ACESSAR ESTOQUE</Text>
        </TouchableOpacity>
        
        <View style={styles.linksContainer}>
          <Link href="/cadastro" style={styles.linkText}>Criar Conta</Link>
          <Text style={{color: '#ccc', marginHorizontal: 10}}>|</Text>
          <Link href="/recuperar" style={styles.linkText}>Esqueci a Senha</Link>
          <Text style={{color: '#ccc', marginHorizontal: 10}}>|</Text>
          <Link href="/produto" style={styles.linkText}>+ Novo Produto</Link>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Seu estilo incrível permanece 100% igual!
export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    padding: 24, 
    backgroundColor: '#F8FAFC', 
    justifyContent: 'center', 
  },
  titulo: {
    fontSize: 34, 
    fontWeight: '800', 
    color: '#0F172A', 
    textAlign: 'center',
    letterSpacing: -0.5, 
  },
  subtitulo: {
    fontSize: 16,
    color: '#64748B', 
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 40, 
  },
  input: {
    backgroundColor: '#FFFFFF', 
    borderWidth: 1,
    borderColor: '#E2E8F0', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 16,
    fontSize: 16,
    color: '#334155', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, 
  },
  botao: {
    backgroundColor: '#4F46E5', 
    padding: 18, 
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5, 
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    flexWrap: 'wrap',
    gap: 12, 
  },
  linkText: {
    color: '#4F46E5', 
    fontWeight: '600',
    fontSize: 14, 
  },
});