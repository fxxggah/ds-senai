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

export default function TelaProduto() {
  const [nomeProduto, setNomeProduto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [observacao, setObservacao] = useState('');

  const registrarEntrada = () => {
    if (!nomeProduto || !categoria || !quantidade) {
      Alert.alert('Erro', 'Preencha o Nome, Categoria e Quantidade do produto!');
      return;
    }

    Alert.alert(
      'Produto Registrado!',
      `Foram adicionadas ${quantidade} unidades de ${nomeProduto} (${categoria}) ao estoque.`
    );

    setNomeProduto('');
    setCategoria('');
    setQuantidade('');
    setObservacao('');
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
          keyboardType="numeric" // Abre o teclado numérico
          value={quantidade}
          onChangeText={setQuantidade}
        />

        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Observações (ex: Produtos de vitrine, embalagem amassada)"
          multiline={true}
          numberOfLines={3}
          value={observacao}
          onChangeText={setObservacao}
        />

        <TouchableOpacity style={styles.botao} onPress={registrarEntrada}>
          <Text style={styles.botaoTexto}>REGISTRAR NO ESTOQUE</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}