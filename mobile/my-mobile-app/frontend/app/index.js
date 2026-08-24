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
  Alert,
  ActivityIndicator
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Link, useRouter } from 'expo-router'; 
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import api from '../services/api'; 

// =========================================================
// TELA DE LOGIN / AUTENTICAÇÃO
// Responsável por validar as credenciais do usuário, 
// armazenar a sessão localmente e gerenciar o estado de conexão
// =========================================================

export default function TelaLogin() {
  // Estados para inputs e estado de carregamento
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false); 
  
  // Hooks de navegação e verificação de rede
  const router = useRouter(); 
  const netInfo = useNetInfo();

  // =========================================================
  // FUNÇÃO: Autenticação de usuário via API Gateway
  // =========================================================
  const fazerLogin = async () => {
    // Feedback tátil leve ao pressionar o botão
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Validação básica dos campos de entrada
    if (email === '' || senha === '') {
      Alert.alert('Atenção', 'Preencha e-mail e senha!');
      return;
    }
    
    setCarregando(true);

    try {
      // Rota enviada via API Gateway: /api/auth/login -> Backend:3003
      const resposta = await api.post('/api/auth/login', {
        email: email,
        senha: senha
      });

      const usuario = resposta.data.usuario;

      if (usuario?.id) {
        await AsyncStorage.setItem('usuarioId', String(usuario.id));
      }
      if (usuario?.email) {
        await AsyncStorage.setItem('usuarioEmail', usuario.email);
      }

      const nomeUsuario = usuario?.nome || email;
      Alert.alert('Acesso Permitido', `Bem-vindo(a), ${nomeUsuario}!`);
      
      // Redireciona para o painel principal na área autenticada
      router.replace('/(tabs)/home');
      
    } catch (erro) {
      console.error(erro);
      if (erro.response) {
        Alert.alert('Acesso Negado', erro.response.data.error);
      } else {
        Alert.alert('Erro de Conexão', 'Servidor offline ou IP incorreto.');
      }
    } finally {
      setCarregando(false);
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
        
        {/* Banner de alerta para falta de conexão com a internet */}
        {netInfo.isConnected === false && (
          <View style={styles.bannerOffline}>
            <Text style={styles.textoOffline}>
              ⚠️ Dispositivo Offline. Verifique sua conexão com a rede da fábrica.
            </Text>
          </View>
        )}

        {/* Cabeçalho da aplicação */}
        <Text style={styles.titulo}>InfoEstoque</Text>
        <Text style={styles.subtitulo}>Gestão de Peças e Periféricos</Text>
        
        {/* Campo: E-mail */}
        <TextInput
          style={styles.input}
          placeholder="E-mail do Vendedor"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        
        {/* Campo: Senha */}
        <TextInput
          style={styles.input}
          placeholder="Senha de Acesso"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />

        {/* Link para recuperação de senha */}
        <TouchableOpacity 
          style={styles.containerEsqueceuSenha}
          onPress={() => router.push('/recuperar')}
        >
          <Text style={styles.linkEsqueceuSenha}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        
        {/* Botão de Entrar */}
        <TouchableOpacity 
          style={[
            styles.botao, 
            (carregando || netInfo.isConnected === false) && styles.botaoDesabilitado
          ]} 
          onPress={fazerLogin}
          disabled={carregando || netInfo.isConnected === false} 
        >
          {carregando ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.botaoTexto}>ACESSAR ESTOQUE</Text>
          )}
        </TouchableOpacity>
        
        {/* Rodapé com links secundários de navegação */}
        <View style={styles.linksContainer}>
          <Link href="/cadastro" style={styles.linkText}>Criar Conta</Link>
          <Text style={{color: '#ccc', marginHorizontal: 10}}>|</Text>
          <Link href="/suporte" style={styles.linkText}>Suporte</Link>
          <Text style={{color: '#ccc', marginHorizontal: 10}}>|</Text>
          <Link href="/produto" style={styles.linkText}>+ Novo Produto</Link>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// =========================================================
// ESTILIZAÇÃO COMPONENTE (StyleSheet Exportado)
// =========================================================

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    padding: 24, 
    backgroundColor: '#F8FAFC', 
    justifyContent: 'center', 
  },
  bannerOffline: {
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  textoOffline: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#94A3B8',
    elevation: 0,
    shadowOpacity: 0,
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
    marginBottom: 12,
    fontSize: 16,
    color: '#334155', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, 
  },
  containerEsqueceuSenha: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  linkEsqueceuSenha: {
    color: '#4F46E5',
    fontWeight: '600',
    fontSize: 14,
  },
  botao: {
    backgroundColor: '#4F46E5', 
    padding: 18, 
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
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