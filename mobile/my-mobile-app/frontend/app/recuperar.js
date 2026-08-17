import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import api from '../services/api';

// =========================================================
// TELA DE RECUPERAÇÃO DE ACESSO / SOLICITAÇÃO AO RH
// Permite ao usuário solicitar instruções para redefinição de senha
// =========================================================

export default function TelaRecuperar() {
  // Estados para armazenamento do e-mail e controle do indicador de carregamento
  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const router = useRouter();

  // =========================================================
  // FUNÇÃO: Solicitação de nova senha via API Gateway
  // =========================================================
  const solicitarNovaSenha = async () => {
    // Validação básica do campo de e-mail
    if (!email) {
      return Alert.alert('Erro', 'Por favor, informe seu e-mail cadastrado.');
    }

    setCarregando(true);

    try {
      // Rota POST enviada via API Gateway: /api/auth/recuperar -> Backend:3003
      const res = await api.post('/api/auth/recuperar', { email });

      Alert.alert('Solicitação Enviada', res.data.message);
      
      // Limpa o campo e redireciona de volta para a tela inicial de Login
      setEmail('');
      router.replace('/');
    } catch (erro) {
      if (erro.response) {
        Alert.alert('Erro', erro.response.data.error);
      } else {
        Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor do RH.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        
        {/* Cabeçalho da Tela */}
        <Text style={styles.titulo}>Recuperar Acesso</Text>
        <Text style={styles.subtitulo}>
          Informe seu e-mail cadastrado. Você receberá as instruções e o suporte pelo RH.
        </Text>

        {/* Campo: E-mail Corporativo */}
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail corporativo"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Botão de Envio de Solicitação */}
        <TouchableOpacity 
          style={[styles.botao, carregando && styles.botaoDesabilitado]} 
          onPress={solicitarNovaSenha}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.botaoTexto}>SOLICITAR AO RH</Text>
          )}
        </TouchableOpacity>

        {/* Botão para retornar à tela de Login */}
        <TouchableOpacity onPress={() => router.back()} style={styles.botaoVoltar}>
          <Text style={styles.textoVoltar}>Voltar para o Login</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// =========================================================
// ESTILIZAÇÃO COMPONENTE (StyleSheet)
// =========================================================

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#334155',
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#4F46E5',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoDesabilitado: {
    backgroundColor: '#94A3B8',
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    marginTop: 20,
    alignItems: 'center',
  },
  textoVoltar: {
    color: '#4F46E5',
    fontWeight: '600',
    fontSize: 14,
  },
});