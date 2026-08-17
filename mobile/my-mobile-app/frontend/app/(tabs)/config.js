import { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native'; 
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import api from '../../services/api'; 

// =========================================================
// TELA DE CONFIGURAÇÕES / GERENCIAMENTO DA CONTA
// Responsável pelas ações de Logout e Exclusão Permanente de Perfil
// =========================================================

export default function TelaConfig() {
  // Controle do estado de exibição do Modal de Confirmação de Logout
  const [modalVisivel, setModalVisivel] = useState(false); 
  const router = useRouter();

  // =========================================================
  // FUNÇÃO: Encerramento de Sessão (Logout)
  // Limpa o ID do usuário salvo no dispositivo e redireciona para a Login
  // =========================================================
  const fazerLogout = async () => {
    setModalVisivel(false);
    await AsyncStorage.removeItem('usuarioId'); 
    router.replace('/');
  };

  // =========================================================
  // FUNÇÃO: Exclusão Definitiva de Conta
  // Faz chamada à API via Gateway e remove os dados locais do storage
  // =========================================================
  const deletarConta = async () => {
    try {
      const idSalvo = await AsyncStorage.getItem('usuarioId');

      if (!idSalvo) {
        return Alert.alert('Erro', 'Nenhum usuário logado encontrado.');
      }

      // Requisição DELETE repassada via API Gateway (/api/perfil -> Backend:3003)
      await api.delete(`/api/perfil/usuarios/${idSalvo}`);

      Alert.alert('Sucesso', 'Sua conta foi excluída permanentemente.');
      await AsyncStorage.removeItem('usuarioId'); 
      router.replace('/'); 
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro', 'Não foi possível excluir a conta no momento.');
    }
  };

  // Pop-up nativo de confirmação de segurança antes de deletar a conta
  const confirmarExclusao = () => {
    Alert.alert(
      'Atenção! Ação Irreversível',
      'Tem certeza que deseja excluir seu perfil corporativo? Você perderá o acesso ao InfoEstoque.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim, excluir', style: 'destructive', onPress: deletarConta }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações da Conta</Text>
      
      {/* Botão para abrir modal de Logout */}
      <TouchableOpacity style={styles.botaoSair} onPress={() => setModalVisivel(true)}>
        <Text style={styles.textoBotaoSair}>Sair do Sistema</Text>
      </TouchableOpacity>

      <View style={styles.linhaDivisoria} />

      {/* Botão para disparar alerta de Exclusão de Conta */}
      <TouchableOpacity style={styles.botaoExcluir} onPress={confirmarExclusao}>
        <Text style={styles.textoBotaoExcluir}>Excluir Minha Conta</Text>
      </TouchableOpacity>

      {/* 
        =========================================================
        MODAL DE CONFIRMAÇÃO DE LOGOUT
        =========================================================
      */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Atenção</Text>
            <Text style={styles.modalTexto}>Deseja realmente encerrar a sessão?</Text>
            
            <View style={styles.botoesContainer}>
              <TouchableOpacity 
                style={styles.botaoCancelar} 
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.botaoConfirmar} 
                onPress={fazerLogout}
              >
                <Text style={styles.textoBotaoConfirmar}>Confirmar Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// =========================================================
// ESTILIZAÇÃO COMPONENTE (StyleSheet)
// =========================================================

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'center' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  
  botaoSair: { backgroundColor: '#003366', padding: 15, borderRadius: 8, alignItems: 'center' }, 
  textoBotaoSair: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },

  linhaDivisoria: { height: 1, backgroundColor: '#cccccc', marginVertical: 40 },

  botaoExcluir: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#cc0000', padding: 15, borderRadius: 8, alignItems: 'center' },
  textoBotaoExcluir: { color: '#cc0000', fontSize: 16, fontWeight: 'bold' },
  
  // Estilos do Modal de Logout
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
    elevation: 5,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  modalTexto: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  botoesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoCancelar: {
    color: '#333',
    fontWeight: 'bold',
  },
  botaoConfirmar: {
    flex: 1,
    backgroundColor: '#cc0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoConfirmar: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});