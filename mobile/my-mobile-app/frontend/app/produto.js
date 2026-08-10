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
import api from '../services/api'; // 🔌 Importando nossa conexão com a API

export default function TelaProduto() {
  const [nomeProduto, setNomeProduto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [quantidade, setQuantidade] = useState('');
  // Trocamos observacao por preco para alinhar com o Banco de Dados
  const [preco, setPreco] = useState(''); 

  const registrarEntrada = async () => {
    // Validação básica atualizada para exigir o preço
    if (!nomeProduto || !categoria || !quantidade || !preco) {
      Alert.alert('Erro', 'Preencha o Nome, Categoria, Quantidade e Preço do produto!');
      return;
    }

    try {
      // 🔌 Enviando o POST com a propriedade "preco" exata que o backend espera
      const resposta = await api.post('/produtos', {
        nome: nomeProduto,
        categoria: categoria,
        quantidade: quantidade,
        preco: preco 
      });

      // Sucesso!
      Alert.alert(
        'Produto Registrado!',
        resposta.data.message || `Foram adicionadas ${quantidade} unidades de ${nomeProduto} ao estoque.`
      );

      // Limpa os campos após salvar
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
        
        <Text style={[styles.titulo, { fontSize: 24, marginBottom: 5 }]}>
          Entrada de Mercadoria
        </Text>
        <Text style={[styles.subtitulo, { marginBottom: 20 }]}>
          Registre os produtos recém-chegados na loja
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Produto (ex: SSD Kingston 480GB)"
          value={nomeProduto}
          onChangeText={setNomeProduto}
        />

        <TextInput
          style={styles.input}
          placeholder="Categoria (ex: Hardware, Periféricos, Cabos)"
          value={categoria}
          onChangeText={setCategoria}
        />

        <TextInput
          style={styles.input}
          placeholder="Quantidade Recebida (ex: 10)"
          keyboardType="numeric" 
          value={quantidade}
          onChangeText={setQuantidade}
        />

        {/* Novo input de Preço no lugar da Observação */}
        <TextInput
          style={styles.input}
          placeholder="Preço Unitário (ex: 250.00)"
          keyboardType="numeric"
          value={preco}
          onChangeText={setPreco}
        />

        <TouchableOpacity style={styles.botao} onPress={registrarEntrada}>
          <Text style={styles.botaoTexto}>REGISTRAR NO ESTOQUE</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}