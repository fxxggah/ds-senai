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
// TELA DE CADASTRO DE PRODUTOS / ENTRADA DE MERCADORIA
// Registra novos itens no inventário do estoque via API
// =========================================================

export default function TelaProduto() {
  // Estados para armazenamento dos dados do produto
  const [nomeProduto, setNomeProduto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState(''); 

  // =========================================================
  // FUNÇÃO: Envio de dados e registro de mercadoria na API
  // =========================================================
  const registrarEntrada = async () => {
    // Validação dos campos obrigatórios
    if (!nomeProduto || !categoria || !quantidade || !preco) {
      Alert.alert('Erro', 'Preencha o Nome, Categoria, Quantidade e Preço do produto!');
      return;
    }

    try {
      // Rota POST enviando as propriedades exatas para o serviço de produtos
      const resposta = await api.post('/produtos', {
        nome: nomeProduto,
        categoria: categoria,
        quantidade: quantidade,
        preco: preco 
      });

      // Confirmação de cadastro concluído
      Alert.alert(
        'Produto Registrado!',
        resposta.data.message || `Foram adicionadas ${quantidade} unidades de ${nomeProduto} ao estoque.`
      );

      // Limpa os campos do formulário
      setNomeProduto('');
      setCategoria('');
      setQuantidade('');
      setPreco('');

    } catch (erro) {
      console.error(erro);
      if (erro.response) {
        Alert.alert('Atenção', erro.response.data.error || 'Não foi possível cadastrar o produto.');
      } else {
        Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor de estoque.');
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
        contentContainerStyle={{ flexGrow: 1, padding: 20, paddingTop: 30 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5" />
        
        {/* Cabeçalho da Tela */}
        <Text style={[styles.titulo, { fontSize: 24, marginBottom: 5 }]}>
          Entrada de Mercadoria
        </Text>
        <Text style={[styles.subtitulo, { marginBottom: 20 }]}>
          Registre os produtos recém-chegados na loja
        </Text>

        {/* Campo: Nome do Produto */}
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto (ex: SSD Kingston 480GB)"
          value={nomeProduto}
          onChangeText={setNomeProduto}
        />

        {/* Campo: Categoria */}
        <TextInput
          style={styles.input}
          placeholder="Categoria (ex: Hardware, Periféricos, Cabos)"
          value={categoria}
          onChangeText={setCategoria}
        />

        {/* Campo: Quantidade Recebida */}
        <TextInput
          style={styles.input}
          placeholder="Quantidade Recebida (ex: 10)"
          keyboardType="numeric" 
          value={quantidade}
          onChangeText={setQuantidade}
        />

        {/* Campo: Preço Unitário */}
        <TextInput
          style={styles.input}
          placeholder="Preço Unitário (ex: 250.00)"
          keyboardType="numeric"
          value={preco}
          onChangeText={setPreco}
        />

        {/* Botão de Envio do Formulário */}
        <TouchableOpacity style={styles.botao} onPress={registrarEntrada}>
          <Text style={styles.botaoTexto}>REGISTRAR NO ESTOQUE</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}