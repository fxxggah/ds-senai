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
  Platform 
} from 'react-native';
import { Link } from 'expo-router';

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const fazerLogin = () => {
    if (email === '' || senha === '') {
      alert('Atenção: Preencha e-mail e senha para acessar o estoque!');
      return;
    }
    alert('Acessando sistema com: ' + email);
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

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    padding: 24, // Mais respiro nas laterais
    backgroundColor: '#F8FAFC', // Slate 50: Um cinza quase branco e muito elegante
    justifyContent: 'center', 
  },
  titulo: {
    fontSize: 34, // Um pouco maior
    fontWeight: '800', // Fonte bem pesada (bold)
    color: '#0F172A', // Slate 900: Um "quase preto" sofisticado
    textAlign: 'center',
    letterSpacing: -0.5, // Aproxima levemente as letras (tendência moderna)
  },
  subtitulo: {
    fontSize: 16,
    color: '#64748B', // Slate 500: Cinza médio com baixo contraste
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 40, // Afasta bem o cabeçalho do formulário
  },
  input: {
    backgroundColor: '#FFFFFF', // Fundo totalmente branco
    borderWidth: 1,
    borderColor: '#E2E8F0', // Slate 200: Borda super sutil
    borderRadius: 12, // Arredondamento moderno
    padding: 16, // Área de clique mais confortável
    marginBottom: 16,
    fontSize: 16,
    color: '#334155', // Cor do texto que o usuário digita
    // Sombra suave para destacar o input do fundo (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    // Sombra suave (Android)
    elevation: 1, 
  },
  botao: {
    backgroundColor: '#4F46E5', // Indigo 600: Cor tech vibrante e moderna
    padding: 18, // Botão um pouco mais alto
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    // Sombra colorida no botão para dar efeito de "brilho"
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
    letterSpacing: 0.5, // Afasta um pouco as letras para melhor leitura em caixa alta
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    flexWrap: 'wrap',
    gap: 12, // Propriedade moderna para espaçar os itens automaticamente
  },
  linkText: {
    color: '#4F46E5', // Mesma cor do botão
    fontWeight: '600',
    fontSize: 14, // Fonte um pouco menor para links secundários
  },
});