import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform 
} from 'react-native';
import { styles } from './index'; 

export default function TelaRecuperar() {
  const [email, setEmail] = useState('');

  const solicitarNovaSenha = () => {
    if (!email) {
      alert('Por favor, informe o e-mail cadastrado.');
      return;
    }
    alert(`Um link de recuperação foi enviado para o e-mail do funcionário: ${email}`);
    setEmail('');
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
        
        <Text style={styles.titulo}>Recuperar Acesso</Text>
        
        <Text style={{ marginBottom: 20, textAlign: 'center', color: '#555' }}>
          Esqueceu sua senha do InfoEstoque? Informe seu e-mail para solicitar a redefinição ao gerente.
        </Text>
        
        <TextInput
          style={styles.input}
          placeholder="E-mail do Funcionário"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        
        <TouchableOpacity style={styles.botao} onPress={solicitarNovaSenha}>
          <Text style={styles.botaoTexto}>SOLICITAR NOVA SENHA</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}